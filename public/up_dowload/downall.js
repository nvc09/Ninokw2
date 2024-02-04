exports.name = '/allinone';
exports.index = async (req, res, next) => {
  const link = req.query.link;
  if (!link) return res.json({ error: 'Thiếu dữ liệu để khởi chạy chương trình' });

  const axios = require('axios');

  const options = {
    method: 'POST',
    url: 'https://all-media-downloader-v2.p.rapidapi.com/dl',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': 'fd92cf57c9msh1f7b78b804353c7p1548f3jsn69db0304865d',
      'X-RapidAPI-Host': 'all-media-downloader-v2.p.rapidapi.com'
    },
    data: { url: link }
  };

  try {
    const response = await axios.request(options);
    if (response.status === 200) {
      console.log(response.data);
      return res.json(response.data);
    } else {
      return res.json({ error: 'Có lỗi xảy ra khi tải xuống dữ liệu ' });
    }
  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.data);
      return res.json({ error: error.response.data });
    } else if (error.request) {
      console.error('Error request:', error.request);
      return res.json({ error: 'Yêu cầu tới server không có phản hồi' });
    } else {
      console.error('Error:', error.message);
      return res.json({ error: 'Có lỗi xảy ra khi gửi yêu cầu' });
    }
  }
};
