exports.name = '/pinterest/user';
exports.index = async (req, res, next) => {
  const key = req.query.key;
  if (!key) return res.json({ error: 'Thiếu dữ liệu để khởi chạy chương trình ' });

  const axios = require('axios');

  const requestData = {
    username: key
  };

  const options = {
    method: 'POST',
    url: 'https://pinterest-downloader-download-pinterest-image-video-and-reels.p.rapidapi.com/api/userpins',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': 'fd92cf57c9msh1f7b78b804353c7p1548f3jsn69db0304865d',
      'X-RapidAPI-Host': 'pinterest-downloader-download-pinterest-image-video-and-reels.p.rapidapi.com'
    },
    data: requestData
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return res.json(response.data);
  } catch (error) {
    console.error(error);
    return res.json({ error: 'Có lỗi xảy ra khi tải xuống dữ liệu từ Pinterest' });
  }
};
