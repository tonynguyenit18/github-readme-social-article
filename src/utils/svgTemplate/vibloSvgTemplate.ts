import { VibloArticle } from "src/services/viblo/type"

export const generateVibloTemplate = ({
  vibloArticles,
  styles = { width: 400, height: 300 }
}: {
  vibloArticles: VibloArticle[]
  styles?: { width: number; height: number }
}) => {
  let cardBody = ""
  vibloArticles.forEach((article) => {
    cardBody += `<div class="outer-container flex">
            <a class="container flex-left flex-direction-column" href="${article.url}" target="__blank">
              <img src="${article.thumbnail}" />
              <div class="right">
                ${article.title ? "<h4>" + article.title + "</h4>" : ""}
                <small>${article.date}</small>
                <p>${article.description}</p>
              </div>
            </a>
          </div>`
  })
  const svgHeight = styles.height * Math.ceil(vibloArticles.length / 2)
  const svg = `<svg fill="none" width="810" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
              font-family: sans-serif
            }
    
            @keyframes gradientBackground {
              0% {
                background-position-x: 0%;
              }
    
              100% {
                background-position-x: 100%;
              }
            }
    
            .flex {
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
  
            .flex-wrap {
              flex-wrap: wrap;
            }
  
            .flex-left {
              align-items: flex-start ;
            }
  
            .flex-direction-column{
              flex-direction: column;
            }
  
            .outer-container {
              height:${styles.height}px;
            }
            .container {
              height: ${styles.height - 2}px;
              width: ${styles.width - 5}px;
              border: 1px solid rgba(0, 0, 0, .2);
              border-radius: 10px;
              background: linear-gradient(60deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 47%, rgba(246, 246, 246, 1) 50%, rgba(255, 255, 255, 1) 53%, rgba(255, 255, 255, 1) 100%);
              background-size: 600% 400%;
              animation: gradientBackground 3s ease infinite;
              overflow: hidden;
              text-overflow: ellipsis;
              padding-bottom:5px;
            }
    
            img {
              width: 100%;
              height: 72%;
              object-fit: cover;
            }
    
            .right {
              flex: 1;
              margin-left: 20px
            }
    
            a {
              text-decoration: none;
              color: inherit
            }
    
            p {
              font-size: 14px;
              line-height: 1.5;
              color: #555
            }
    
            h4 {
              margin-top: 5px;
              color: #333
            }
    
            small {
              color: #888;
              font-size: 12px;
              display: block;
              margin-top: 2px;
              margin-bottom: 2px
            }
          </style>
          <div class="flex flex-wrap" >
            ${cardBody}
          </div>
        </div>
      </foreignObject>
    </svg>`
  return svg
}

export const generateNotFoundVibloTemplate = (styles?: { width: number; height: number }) => {
  const { width = 400, height = 300 } = styles || {}
  const svg = `<svg fill="none" width="810" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
              font-family: sans-serif
            }
    
            @keyframes gradientBackground {
              0% {
                background-position-x: 0%;
              }
    
              100% {
                background-position-x: 100%;
              }
            }
    
            .flex {
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
  
            .outer-container {
              height:${height}px;
            }
            .container {
              height: ${height - 2}px;
              width: ${width - 5}px;
              border: 1px solid rgba(0, 0, 0, .2);
              border-radius: 10px;
              background: linear-gradient(60deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 47%, rgba(246, 246, 246, 1) 50%, rgba(255, 255, 255, 1) 53%, rgba(255, 255, 255, 1) 100%);
              background-size: 600% 400%;
              animation: gradientBackground 3s ease infinite;
              overflow: hidden;
              text-overflow: ellipsis;
              padding-bottom:5px;
            }
          </style>
          <div class="flex" >
            <div class="outer-container flex">
              <div class="container flex"  style="justify-content: center; align-items: center;">
                <h3>
                  Not Found
                </h3>
              </div>
            </div>
          </div>
        </div>
      </foreignObject>
    </svg>`
  return svg
}

export const generateUserNotFoundVibloTemplate = ({ username }: { username: string }) => {
  const svg = `<svg fill="none" width="200" height="100" xmlns="http://www.w3.org/2000/svg">
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
              font-family: sans-serif
            }
    
            @keyframes gradientBackground {
              0% {
                background-position-x: 0%;
              }
    
              100% {
                background-position-x: 100%;
              }
            }
    
            .flex {
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
  
            .outer-container {
              height:100px;
            }
            .container {
              height: 95px;
              width: 100px;
              border: 1px solid rgba(0, 0, 0, .2);
              border-radius: 10px;
              background: linear-gradient(60deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 47%, rgba(246, 246, 246, 1) 50%, rgba(255, 255, 255, 1) 53%, rgba(255, 255, 255, 1) 100%);
              background-size: 600% 400%;
              animation: gradientBackground 3s ease infinite;
              overflow: hidden;
              text-overflow: ellipsis;
              padding-bottom:5px;
            }
          </style>
            <a href="https://viblo.asia/u/${username}" target="__blank">
              <h3>
                User does not exist
              </h3>
            </a>
        </div>
      </foreignObject>
    </svg>`
  return svg
}
