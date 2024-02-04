const axios = require('axios');

exports.name = '/chatgpt5';
exports.index = async (req, res, next) => {
  const text = req.query.text;

  if (!text) {
    return res.status(400).json({ error: 'Thiếu dữ liệu để khởi chạy chương trình' });
  }

  try {
    const response = await askChatGPT(text);
    console.log(response.data);
    return res.json(response.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Có lỗi xảy ra khi AI trả lời' });
  }
};

async function askChatGPT(text) {
  const options = {
    method: 'POST',
    url: 'https://chatgpt-gpt5.p.rapidapi.com/ask',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': 'fd92cf57c9msh1f7b78b804353c7p1548f3jsn69db0304865d',
      'X-RapidAPI-Host': 'chatgpt-gpt5.p.rapidapi.com'
    },
    data: { query: text }
  };

  return await axios.request(options);
}
