import { MediumArticle } from "../services/medium/apis"

export const generateMediumTemplate = ({
  mediumArticle,
  styles = { width: 700, height: 120 }
}: {
  mediumArticle: MediumArticle
  styles?: { width: number; height: number }
}) => `<svg fill="none" width="800" height=${styles.height} xmlns="http://www.w3.org/2000/svg">
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
          height:120px;
        }
        .container {
          height: 118px;
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
      </style>
      <div class="outer-container flex">
        <a class="container flex" href=${mediumArticle.url} target="__blank">
          <img src=${mediumArticle.thumbnail} />
          <div class="right">
            <h3>${mediumArticle.title}</h3>
            <small>${mediumArticle.date}</small>
            <p>${mediumArticle.description}</p>
          </div>
        </a>
      </div>
    </div>
  </foreignObject>
</svg>`
