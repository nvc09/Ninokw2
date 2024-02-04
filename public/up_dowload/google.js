exports.name = '/google/search';
exports.index = async (req, res, next) => {
  const text = req.query.text;
  if (!text) return res.status(400).json({ error: 'Hãy nhập từ muốn tìm kiếm' });

  const axios = require('axios');

  const options = {
    method: 'GET',
    url: 'https://google-web-search1.p.rapidapi.com/',
    params: {
      query: text,
      limit: '20',
      related_keywords: 'true'
    },
    headers: {
      'X-RapidAPI-Key': 'fd92cf57c9msh1f7b78b804353c7p1548f3jsn69db0304865d',
      'X-RapidAPI-Host': 'google-web-search1.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return res.json(response.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Lỗi' });
  }
};
