import axios from "axios"
import { DevtoArticle, DevtoOptions } from "./type"

const devtoArticlesEndpoint = "https://dev.to/api/articles"
export const devtoRecentArticles = async ({
  userName,
  devtoOptions
}: {
  userName: string
  devtoOptions: DevtoOptions
}): Promise<DevtoArticle[]> => {
  const { top = 6 } = devtoOptions
  let { data } = await axios.get(`${devtoArticlesEndpoint}?username=${userName}&per_page=${top}`)
  const devtoArticles: DevtoArticle[] = data.map((rawArticle) => {
    return {
      title: rawArticle.cover_image ? rawArticle.title : "", // If there is no cover image, devto will generate thumbnail using title, so we don't want to show title by text again
      thumbnail: rawArticle.social_image,
      url: rawArticle.url,
      date: rawArticle.created_at,
      description: rawArticle.description
    }
  })

  return devtoArticles
}
