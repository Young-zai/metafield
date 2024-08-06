import fetch from 'node-fetch';

export default async function handler(req, res) {
  // 添加 CORS 头信息
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // 处理预检请求
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const customerData = req.body;
    try {
      const shopifyResponse = await fetch('https://156e1b-51.myshopify.com/admin/api/2024-07/customers.json', {
        method: 'POST',
        headers: {
          'X-Shopify-Access-Token': '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',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customerData)
      });

      const data = await shopifyResponse.json();

      if (!shopifyResponse.ok) {
        return res.status(shopifyResponse.status).json({ error: data });
      }

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
