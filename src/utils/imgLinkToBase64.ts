import axios from "axios"

export const imgLinkToBase64 = async (link: string) => {
  const response = await axios.get(link, {
    responseType: "arraybuffer"
  })
  const rawImage = response.data
  const imageType = response?.headers?.["content-type"]
  const base64Img = Buffer.from(rawImage).toString("base64")
  const base64 = `data:${imageType};base64,${base64Img}`
  return { link, base64 }
}
