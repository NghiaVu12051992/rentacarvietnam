interface Env {
  DB?: any;
}

interface QuoteRequestBody {
  pax?: string;
  days?: string;
  dest?: string;
  date?: string;
  contact?: string;
  email?: string;
  note?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
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

    const quoteRecord = {
      pax: body.pax || 'Unspecified',
      days: body.days || 'Unspecified',
      destination: body.dest || 'Unspecified',
      travel_date: body.date || 'Unspecified',
      contact: contact,
      email: (body.email || '').trim(),
      note: (body.note || '').trim(),
      created_at: new Date().toISOString(),
    };

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

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Quote inquiry successfully logged on Cloudflare Edge.',
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
