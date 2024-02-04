exports.name = '/aidraw';
exports.index = async (req, res, next) => {
  const text = req.query.text;
  if (!text) return res.status(400).json({ error: 'Hãy nhập từ muốn AI vẽ' });

  const axios = require('axios');

  const options = {
    method: 'GET',
    url: 'https://drawing1.p.rapidapi.com/aiDraw',
    params: {
      description: text,
      Styles: '201',
      RspImgType: 'url',
      ResultConfig: '768:768'
    },
    headers: {
      'X-RapidAPI-Key': 'fd92cf57c9msh1f7b78b804353c7p1548f3jsn69db0304865d',
      'X-RapidAPI-Host': 'drawing1.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return res.json(response.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Có lỗi xảy ra khi truy vấn dịch vụ AI Drawing' });
  }
};
