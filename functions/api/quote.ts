interface Env {
  DB?: any;
  GOOGLE_SCRIPT_URL?: string;
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
  TELEGRAM_TOPIC_ID?: string;
}

interface QuoteRequestBody {
  pax?: string;
  days?: string;
  dest?: string;
  date?: string;
  contact?: string;
  email?: string;
  note?: string;
  name?: string;
}

function escapeHtml(text: string = ''): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export const onRequestPost = async (context: {
  request: Request;
  env: Env;
}) => {
  try {
    const { request, env } = context;
    const body: QuoteRequestBody = await request.json();
    const contact = (body.contact || '').trim();

    if (!contact) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Contact information (WhatsApp or Email) is required.',
        }),
        {
          status: 422,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const clientName = (body.name || contact).trim();
    const quoteRecord = {
      name: clientName,
      pax: body.pax || 'Unspecified',
      days: body.days || 'Unspecified',
      destination: body.dest || 'Unspecified',
      travel_date: body.date || 'Unspecified',
      contact: contact,
      email: (body.email || '').trim(),
      note: (body.note || '').trim(),
      created_at: new Date().toISOString(),
    };

    // 1. Cloudflare D1 Database Logging
    if (env.DB && typeof env.DB.prepare === 'function') {
      try {
        await env.DB
          .prepare(
            `INSERT INTO quotes (pax, days, destination, travel_date, contact_phone, contact_email, notes, created_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
          )
          .bind(
            quoteRecord.pax,
            quoteRecord.days,
            quoteRecord.destination,
            quoteRecord.travel_date,
            quoteRecord.contact,
            quoteRecord.email,
            quoteRecord.note,
            quoteRecord.created_at
          )
          .run();
      } catch (dbError) {
        console.error('Cloudflare D1 insert error:', dbError);
      }
    }

    // 2. Google Apps Script Dispatch (Auto-reply to Client & Admin Notification)
    const googleScriptUrl = env.GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbyBHfXIvGagucDaaLS6M0Kqq5PY91GSr7RBUXDJuLJND6FUo5bEt59gXvSlG18TFCs/exec';
    try {
      await fetch(googleScriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          site: 'rentacarvietnam',
          service_type: 'car_rental',
          name: quoteRecord.name,
          email: quoteRecord.email,
          phone_whatsapp: quoteRecord.contact,
          starting_city: quoteRecord.destination,
          destination: quoteRecord.destination,
          passengers: quoteRecord.pax,
          duration: quoteRecord.days,
          departure_date: quoteRecord.travel_date,
          travel_date: quoteRecord.travel_date,
          special_requests: quoteRecord.note,
          trip_request: `Group: ${quoteRecord.pax} | Duration: ${quoteRecord.days} | Route: ${quoteRecord.destination} | Date: ${quoteRecord.travel_date}${quoteRecord.note ? ` | Note: ${quoteRecord.note}` : ''}`,
          page: 'https://rentacarvietnam.com/#booking-wizard',
          locale: 'en',
        }),
      });
    } catch (gErr) {
      console.error('Google Apps Script dispatch error:', gErr);
    }

    // 3. Telegram Instant Dispatch (Optional if configured)
    if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
      try {
        const nowVietnam = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
        const tgLines = [
          `🚗 <b>[RENT A CAR VIETNAM] YÊU CẦU BÁO GIÁ MỚI!</b>`,
          `────────────────────────`,
          `👤 <b>Khách hàng:</b> ${escapeHtml(quoteRecord.name)}`,
          `📍 <b>Lộ trình / Tuyến xe:</b> ${escapeHtml(quoteRecord.destination)}`,
          `👥 <b>Số lượng khách:</b> ${escapeHtml(quoteRecord.pax)}`,
          `⏱️ <b>Thời gian thuê:</b> ${escapeHtml(quoteRecord.days)}`,
          `📅 <b>Ngày khởi hành:</b> ${escapeHtml(quoteRecord.travel_date)}`,
        ];

        if (quoteRecord.note) {
          tgLines.push(`📝 <b>Ghi chú:</b> ${escapeHtml(quoteRecord.note)}`);
        }

        tgLines.push(
          `────────────────────────`,
          `💬 <b>Liên hệ (WhatsApp/SĐT):</b> <code>${escapeHtml(quoteRecord.contact)}</code>`,
          `✉️ <b>Email:</b> ${quoteRecord.email ? `<code>${escapeHtml(quoteRecord.email)}</code>` : 'Chưa có'}`,
          `🌐 <b>Website:</b> rentacarvietnam.com (by VN to You Tour)`,
          `⏰ <b>Thời gian:</b> ${escapeHtml(nowVietnam)} (Giờ VN)`
        );

        const cleanDigits = quoteRecord.contact.replace(/[^\d+]/g, '');
        const waNumber = cleanDigits.startsWith('+') ? cleanDigits.replace('+', '') : cleanDigits;
        const inlineKeyboard = [
          [
            {
              text: '💬 Nhắn WhatsApp',
              url: `https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi, Rent A Car Vietnam received your quotation request for ${quoteRecord.destination} (${quoteRecord.days}, ${quoteRecord.pax}). How may we assist you?`)}`
            }
          ]
        ];

        const tgPayload: Record<string, any> = {
          chat_id: env.TELEGRAM_CHAT_ID,
          text: tgLines.join('\n'),
          parse_mode: 'HTML',
          reply_markup: { inline_keyboard: inlineKeyboard }
        };

        if (env.TELEGRAM_TOPIC_ID) {
          const topicId = parseInt(env.TELEGRAM_TOPIC_ID, 10);
          if (!isNaN(topicId)) tgPayload.message_thread_id = topicId;
        }

        await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(tgPayload),
        });
      } catch (tgErr) {
        console.error('Telegram dispatch error:', tgErr);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Quote inquiry successfully logged and dispatched.',
        data: quoteRecord,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: 'Server error processing quote' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

