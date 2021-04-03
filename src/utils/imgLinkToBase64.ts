import axios from "axios"

export const imgLinkToBase64 = async (link: string) => {
  const { data: rawImage } = await axios.get(link, {
    responseType: "arraybuffer"
  })
  const base64Img = Buffer.from(rawImage).toString("base64")
  const imgTypeArr = link.split(".")
  const imgType = imgTypeArr[imgTypeArr.length - 1]
  const base64 = `data:image/${imgType};base64,${base64Img}`
  return { link, base64 }
}
