import axios from 'axios';
import { END_POINTS } from '../constantURL';

// Get weather API
export const getCovidData = async () => {
  const URL = `${END_POINTS.GET_COVID_DATA}`;
  const response = await axios.get(URL);
  let data = response.data;
  if (!data) {
    return "Some issue in fetching data! Please try again later.";
  }
  console.log(data);
  const global = { ...data.Global };
  const report = `New Confirmed: ${global.NewConfirmed}, New Deaths: ${global.NewDeaths}, New Recovered: ${global.NewRecovered}, Total Confirmed: ${global.TotalConfirmed}: TotalRecovered: ${global.TotalRecovered}`;
  return report;
};


/*export const getNews = async () => {
  const URL = `${END_POINTS.GET_NEWS}?country=us&apiKey=e72353979a9c4885b328e7aa6d2d88d7`;
  try {
    const response = await axios.get(URL);
    if (response.data && response.data.articles) {
      const articles = response.data.articles.slice(0, 5);
      return articles.map((article, index) => `${index + 1}. ${article.title}`).join("\n");
    }
    return "No news available.";
  } catch (error) {
    console.error("Error fetching news:", error);
    return "An error occurred while fetching news.";
  }
};*/
export const getNews = async () => {
  try {
    const response = await axios.get("/.netlify/functions/news");
    const articles = response.data.articles;

    return articles
      .map((article, i) => `${i + 1}. ${article.title}`)
      .join("\n");
  } catch (err) {
    console.error("Frontend error:", err);
    return "Error fetching news.";
  }
};