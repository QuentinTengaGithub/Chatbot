import axios from 'axios';
import { END_POINTS } from '../constantURL';

export const getCovidData = async () => {
  const URL = `${END_POINTS.GET_COVID_DATA}`;

  try {
    const response = await axios.get(URL);
    const data = response.data;

    if (!data) {
      return null;
    }

    return {
      newCases: data.todayCases,
      newDeaths: data.todayDeaths,
      totalCases: data.cases,
      totalRecovered: data.recovered,
    };
  } catch (err) {
    console.error("Error fetching COVID data:", err);
    return null;
  }
};

export const getNews = async () => {
  try {
    const response = await axios.get("/.netlify/functions/news");
    const articles = response.data.articles;

    const formatted = articles
      .map((article, i) => `<b>News ${i + 1}:</b> ${article.title}`)
      .join("<br/><br/>");

    return formatted;
  } catch (err) {
    console.error("Frontend error:", err);
    return "Error fetching news.";
  }
};