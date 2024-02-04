exports.name = '/sc/userinfo';
exports.index = async (req, res, next) => {
  const text = req.query.text;
  if (!text) return res.json({ error: 'Thiếu dữ liệu để khởi chạy chương trình ' });
  const axios = require('axios');

  const options = {
    method: 'POST',
    url: 'https://all-media-api.p.rapidapi.com/v1/social/soundcloud/user/info',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': 'fd92cf57c9msh1f7b78b804353c7p1548f3jsn69db0304865d',
      'X-RapidAPI-Host': 'all-media-api.p.rapidapi.com'
    },
    data: {
      query: text,
      limit: 0,
      offset: 0
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return res.json(response.data);
  } catch (error) {
    console.error(error);
    return res.json({ error: 'Có lỗi xảy ra khi truy vấn thông tin người dùng trên SoundCloud' });
  }
};
