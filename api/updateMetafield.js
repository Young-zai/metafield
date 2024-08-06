module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    res.status(200).end();
    return;
  }

  const { customerId, Whatsapp } = req.body;

  try {
    const response = await fetch(`https://156e1b-51.myshopify.com/admin/api/2024-07/customers/${customerId}/metafields.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': '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'
      },
      body: JSON.stringify({
        metafield: {
          namespace: 'custom',
          key: 'Whatsapp',
          value: Whatsapp,
          value_type: 'string'
        }
      })
    });

    const data = await response.json();

    if (response.ok) {
      res.status(200).json({ success: true, metafield: data.metafield });
    } else {
      res.status(response.status).json({ success: false, message: data.errors });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};