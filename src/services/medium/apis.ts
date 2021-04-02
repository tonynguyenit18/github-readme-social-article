import axios from "axios";

export const mediumRecentArticles = async (userName) => {
  const rssUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/${userName}`;
  const response = await axios.get(rssUrl);
  console.log(response);
};
