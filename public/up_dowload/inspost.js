exports.name = '/instagram/post';
exports.index = async (req, res, next) => {
  const user = req.query.user;
  if (!user) return res.status(400).json({ error: 'Thiếu thông tin người dùng. Vui lòng cung cấp tên người dùng Instagram.' });

  const axios = require('axios');

  const options = {
    method: 'GET',
    url: 'https://instagram230.p.rapidapi.com/user/posts',
    params: { username: user },
    headers: {
      'X-RapidAPI-Key': 'fd92cf57c9msh1f7b78b804353c7p1548f3jsn69db0304865d',
      'X-RapidAPI-Host': 'instagram230.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return res.json(response.data);
  } catch (error) {
    console.error(error);
    return res.status(error.response.status || 500).json({ error: error.response.data || 'Có lỗi xảy ra khi truy vấn thông tin người dùng trên Instagram' });
  }
};
