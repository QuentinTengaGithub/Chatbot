const axios = require("axios");

exports.handler = async (event, context) => {
  try {
    const API_KEY = process.env.NEWS_API_KEY;
    const URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
    console.log("URL: " + URL);

    const response = await axios.get(URL);

    const articles = response.data.articles.slice(0, 5);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ articles }),   // <-- on renvoie un objet { articles: [...] }
    };
  } catch (error) {
    console.error("Serverless error:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: "Failed to fetch news" }),
    };
  }
};
