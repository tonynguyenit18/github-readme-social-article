import axios from "axios"
import { VibloArticle, VibloOptions } from "./type"

const vibloEndpoint = "https://api.viblo.asia"

export const vibloRecentArticles = async ({
  username,
  vibloOptions
}: {
  username: string
  vibloOptions?: VibloOptions
}) => {
  const { top = 2 } = vibloOptions || {}
  let { data } = await axios.get(`${vibloEndpoint}/users/${username}/posts`)
  const rawArticles = data.data

  const topRawArticles = rawArticles.length > top ? rawArticles.slice(0, top) : rawArticles

  const vibloArticles: VibloArticle[] = topRawArticles.map((rawArticle) => {
    return {
      title: rawArticle.title,
      // Some viblo article does not have thumbnail we use default one for facebook metadata and borrow free resize cloudinary
      thumbnail:
        rawArticle.thumbnail_url ||
        "https://res.cloudinary.com/demo/image/fetch/w_400,c_scale/https%3A%2F%2Fviblo.asia%2Fog-facebook-3.png",
      url: rawArticle.url,
      date: rawArticle.published_at,
      description: rawArticle.contents_short
    }
  })
  return vibloArticles
}
