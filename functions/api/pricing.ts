interface PricingEnv {
  CLOUDFLARE_ACCOUNT_ID?: string;
  CLOUDFLARE_DATABASE_ID?: string;
  CLOUDFLARE_API_TOKEN?: string;
  DB?: any;
}

export const onRequestGet = async (context: {
  request?: Request;
  env?: PricingEnv;
}) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'public, max-age=1800, s-maxage=3600', // Cache 1 giờ trên Cloudflare Edge
  };

  const env = context.env || {};

  // 1. Nếu có biến môi trường D1 token, gọi trực tiếp D1
  if (env.CLOUDFLARE_ACCOUNT_ID && env.CLOUDFLARE_DATABASE_ID && env.CLOUDFLARE_API_TOKEN) {
    try {
      const url = `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/d1/database/${env.CLOUDFLARE_DATABASE_ID}/query`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.CLOUDFLARE_API_TOKEN}`,
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
          return new Response(rawJson, {
            status: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          });
        }
      }
    } catch (e) {
      // Fallback bên dưới
    }
  }

  // 2. Fallback qua API public CORS
  try {
    const res = await fetch('https://vntoyoutour.com/api/pricing/load-templates');
    if (res.ok) {
      const data = await res.json();
      if (data.templates?.car_pricing) {
        return new Response(JSON.stringify(data.templates.car_pricing), {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }
    }
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  return new Response(JSON.stringify({ error: 'Unable to retrieve car pricing' }), {
    status: 500,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
};
