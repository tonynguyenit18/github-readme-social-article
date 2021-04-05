import { DevtoArticle } from "../services/devto/type"
import { MediumArticle } from "../services/medium/apis"

export const generateMediumTemplate = ({
  mediumArticles,
  styles = { width: 700, height: 120 }
}: {
  mediumArticles: MediumArticle[]
  styles?: { width: number; height: number }
}) => {
  const numOfArticles = mediumArticles.length
  const front = `<svg fill="none" width="800" height="${
    numOfArticles * styles.height
  }" xmlns="http://www.w3.org/2000/svg">
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
        }

        .outer-container {
          height:${styles.height}px;
        }
        .container {
          height: ${styles.height - 2}px;
          width: ${styles.width}px;
          border: 1px solid rgba(0, 0, 0, .2);
          padding: 10px 20px;
          border-radius: 10px;
          background: rgb(255, 255, 255);
          background: linear-gradient(60deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 47%, rgba(246, 246, 246, 1) 50%, rgba(255, 255, 255, 1) 53%, rgba(255, 255, 255, 1) 100%);
          background-size: 600% 400%;
          animation: gradientBackground 3s ease infinite;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        img {
          margin-right: 10px;
          width: 150px;
          object-fit: cover;
        }

        .right {
          flex: 1;
          margin-left: 10px
        }

        a {
          text-decoration: none;
          color: inherit
        }

        p {
          line-height: 1.5;
          color: #555
        }

        h3 {
          color: #333
        }

        small {
          color: #888;
          display: block;
          margin-top: 5px;
          margin-bottom: 8px
        }
      </style>`

  const back = `</div>
        </foreignObject>
      </svg>`

  let svg = front
  mediumArticles.forEach((mediumArticle) => {
    svg += `<div class="outer-container flex">
  <a class="container flex" href="${mediumArticle.url}" target="__blank">
    <img src="${mediumArticle.thumbnail}" />
    <div class="right">
      <h3>${mediumArticle.title}</h3>
      <small>${mediumArticle.date}</small>
      <p>${mediumArticle.description}</p>
    </div>
  </a>
</div>`
  })

  svg += back

  return svg
}

export const generateDevtoTemplate = ({
  devtoArticles,
  styles = { width: 400, height: 300 }
}: {
  devtoArticles: DevtoArticle[]
  styles?: { width: number; height: number }
}) => {
  let cardBody = ""
  devtoArticles.forEach((article) => {
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
  const svgHeight = styles.height * Math.ceil(devtoArticles.length / 2)
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
