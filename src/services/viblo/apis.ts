import axios from "axios"
import { VibloArticle, VibloOptions } from "./type"

const vibloEndpoint = "https://api.viblo.asia"

export const vibloRecentArticles = async ({
  username,
  vibloOptions
}: {
  username: string
  vibloOptions?: VibloOptions
}): Promise<VibloArticle[]> => {
  try {
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
  } catch (error) {
    console.log(error)
    return
  }
}

/**
 * Get slug from article id.
 * Viblo does not allow to get article by id only by slug
 * @param articleId the long string that ww see in url when accessing viblo article in browser
 * @example
 *
 * // return slug = yMnKMwBzl7P
 * articleId = getting-started-zend-framework-3-yMnKMwBzl7P
 */
const generateSlug = (articleId) => {
  console.log(articleId, articleId?.split("-"))
  return articleId?.split("-").slice(-1)[0]
}

export const vibloArticleByUsernameAndId = async ({
  username,
  articleId
}: {
  username: string
  articleId: string
}): Promise<VibloArticle> => {
  try {
    articleId = generateSlug(articleId)

    let { data } = await axios.get(`${vibloEndpoint}/posts/${articleId}`)
    const rawArticle = data?.post?.data || {}

    if (username !== rawArticle.user?.data?.username) return

    const vibloArticle: VibloArticle = {
      title: rawArticle.title,
      // Some viblo article does not have thumbnail we use default one for facebook metadata and borrow free resize cloudinary
      thumbnail:
        rawArticle.thumbnail_url ||
        "https://res.cloudinary.com/demo/image/fetch/w_400,c_scale/https%3A%2F%2Fviblo.asia%2Fog-facebook-3.png",
      url: rawArticle.canonical_url,
      date: rawArticle.published_at,
      description: rawArticle.seo?.description
    }
    return vibloArticle
  } catch (error) {
    console.log(error)
    return
  }
}
