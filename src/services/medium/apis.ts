import axios from "axios"
import moment from "moment"

export type MediumArticle = {
  title: string
  thumbnail: string
  url: string
  date: string
  description: string
}

export const mediumRecentArticles = async ({
  userName,
  index
}: {
  userName: string
  index: number
}): Promise<MediumArticle[]> => {
  const rssUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/${userName}`
  const { data } = await axios.get(rssUrl)
  let { items } = data || {}
  if (index || index === 0) {
    items = [items?.[index]]
  }

  const recentArticle: MediumArticle[] = items?.map(({ title, thumbnail, link, pubDate, description }) => {
    return {
      title: title,
      thumbnail: thumbnail,
      url: link,
      date: moment(pubDate).format("DD MMM YYYY, HH:mm"),
      description:
        description.replace(/<h3>.*<\/h3>|<figcaption>.*<\/figcaption>|<[^>]*>/gm, "").substring(0, 60) + "..."
    }
  })

  return recentArticle
}
