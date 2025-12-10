const axios = require("axios");

exports.handler = async (event, context) => {
  try {
    const API_KEY = process.env.NEWS_API_KEY;
    const URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

    const response = await axios.get(URL);

    return {
      statusCode: 200,
      body: JSON.stringify({
        articles: response.data.articles.slice(0, 5),
      }),
    };
  } catch (error) {
    console.error("Serverless error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch news" }),
    };
  }
};
