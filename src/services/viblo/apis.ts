import axios from "axios"
import { VibloArticle, VibloOptions } from "./type"

const vibloEndpoint = "https://api.viblo.asia"

// Get endpoint from https://reqbin.com/
const reqbinEndpoint = "https://apius.reqbin.com/api/v1/requests"

// Viblo server is behind cloudflare which is denied ips from most of free serverless provider (vercel, aws, heroku...)
// https://reqbin.com/ is a rest endpoint testing which has static ip (not blocked by cloudflare I guess), use it to bypass cloudflare
const fetchViblo = async (url: string): Promise<any> => {
  console.log("Viblo url", url)
  const postData = JSON.stringify({
    id: "0",
    name: "",
    errors: "",
    json: JSON.stringify({
      method: "GET",
      url: url,
      apiNode: "US",
      contentType: "",
      content: "",
      headers: "",
      errors: "",
      curlCmd: "",
      auth: {
        auth: "noAuth",
        bearerToken: "",
        basicUsername: "",
        basicPassword: "",
        customHeader: "",
        encrypted: ""
      },
      compare: false,
      idnUrl: url
    }),
    sessionId: new Date().getTime()
  })

  const response = await axios.post(reqbinEndpoint, postData, {
    headers: {
      "Content-Type": "application/json"
    }
  })

  return JSON.parse(response.data.Content)
}

export const vibloRecentArticles = async ({
  username,
  vibloOptions
}: {
  username: string
  vibloOptions?: VibloOptions
}): Promise<VibloArticle[]> => {
  try {
    const { top = 2 } = vibloOptions || {}

    const data = await fetchViblo(`${vibloEndpoint}/users/${username}/posts`)

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
    console.log("vibloRecentArticles", error)
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

    const data = await fetchViblo(`${vibloEndpoint}/posts/${articleId}`)
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
    console.log("vibloArticleByUsernameAndId", error)
    return
  }
}
