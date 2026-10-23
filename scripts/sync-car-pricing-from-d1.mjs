// Script đồng bộ bảng giá xe từ Cloudflare D1 của vntoyoutour-com-web-database về rentacarvietnam
import fs from 'node:fs';
import path from 'node:path';

// Đọc credentials từ file .env nếu có
const envPath = path.resolve('.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = (match[2] || '').trim();
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      process.env[key] = process.env[key] || value;
    }
  }
}

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const DATABASE_ID = process.env.CLOUDFLARE_DATABASE_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

const outputPath = path.resolve('src', 'data', 'car-pricing.json');

async function syncPricing() {
  console.log('🔄 Đang đồng bộ bảng giá xe từ Cloudflare D1 master...');

  // 1. Thử qua Cloudflare D1 REST API nếu có credentials trong .env
  if (ACCOUNT_ID && DATABASE_ID && API_TOKEN) {
    try {
      const url = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/d1/database/${DATABASE_ID}/query`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sql: "SELECT value_json FROM pricing_templates WHERE key = 'car_pricing'",
          params: [],
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const rawJson = data.result?.[0]?.results?.[0]?.value_json;
        if (rawJson) {
          const parsed = JSON.parse(rawJson);
          fs.writeFileSync(outputPath, JSON.stringify(parsed, null, 2), 'utf8');
          console.log(`✅ Đồng bộ thành công ${parsed.length} tuyến xe trực tiếp từ Cloudflare D1!`);
          return;
        }
      }
    } catch (err) {
      console.warn('⚠️ Lỗi D1 Direct API:', err.message);
    }
  }

  // 2. Fallback qua API public CORS của vntoyoutour.com (Không cần Token)
  try {
    const fallbackRes = await fetch('https://vntoyoutour.com/api/pricing/load-templates');
    if (fallbackRes.ok) {
      const fbData = await fallbackRes.json();
      if (fbData.templates?.car_pricing) {
        fs.writeFileSync(outputPath, JSON.stringify(fbData.templates.car_pricing, null, 2), 'utf8');
        console.log(`✅ Đồng bộ thành công ${fbData.templates.car_pricing.length} tuyến xe từ vntoyoutour.com!`);
        return;
      }
    }
  } catch (fbErr) {
    console.error('❌ Lỗi kết nối fallback:', fbErr.message);
  }
}

syncPricing();
