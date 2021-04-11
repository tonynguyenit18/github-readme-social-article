# github-readme-social-article

Show your social article on github readme profile

> This repo is inspired by [github-readme-medium-recent-article](https://github.com/bxcodec/github-readme-medium-recent-article).

 ## Format
- **Recent article by index**
`https://github-readme-social-article.vercel.app/<social-site>/<user-name>/<article-id>`

- **Recent article by index**
`https://github-readme-social-article.vercel.app/<social-site>/<user-name>/<index>`

- **List of recent article**
`https://github-readme-social-article.vercel.app/<social-site>/<user-name>`

Params                |Description                      |Note                           |example
----------------------|----------------------|---------------------------------|-------------------------------|----------
`<social-site>`       | name of social site             |Currently only support `medium` and `devto`| `medium`
`<user-name>`         | your user name in the social site|                             | `@tonynguyenit`
`<index>`             | Index of the article         | Currently, Medium support maximum 10 articles| `0`
`<article-id>`        | Unique article id from the social site | After publish the article will have a unique id | `pixelate-images-and-html-element-in-react-78d4120357ad`

## Current support
### 1. [Medium](https://medium.com/)

- **Recent article by article id**
`https://github-readme-social-article.vercel.app/medium/@tonynguyenit/pixelate-images-and-html-element-in-react-78d4120357ad`
![Medium Cards](https://github-readme-social-article.vercel.app/medium/@tonynguyenit/pixelate-images-and-html-element-in-react-78d4120357ad)


- **Recent article by index**
`https://github-readme-social-article.vercel.app/medium/@tonynguyenit/0`
![Medium Cards](https://github-readme-social-article.vercel.app/medium/@tonynguyenit/0)

- **List of recent article**
`https://github-readme-social-article.vercel.app/medium/@tonynguyenit`
![Medium Cards](https://github-readme-social-article.vercel.app/medium/@tonynguyenit)

**Format**
Use [Common Format](#format)

### 2. [Devto](https://dev.to/)

- **Recent article by article id**
`https://github-readme-social-article.vercel.app/devto/tonynguyenit/how-to-show-off-your-social-article-in-github-readme-profile-249`
![Medium Cards](https://github-readme-social-article.vercel.app/devto/tonynguyenit/how-to-show-off-your-social-article-in-github-readme-profile-249)


- **Recent article by index**
`https://github-readme-social-article.vercel.app/devto/tonynguyenit/0`
![Medium Cards](https://github-readme-social-article.vercel.app/devto/tonynguyenit/0)

- **List of recent article**
`https://github-readme-social-article.vercel.app/devto/tonynguyenit?top=2`
![Medium Cards](https://github-readme-social-article.vercel.app/devto/tonynguyenit?top=2)

**Format**
Use [Common Format](#format)

**Special support**

Queries             | Type                 | Default value  | Description                    |Example
--------------------|----------------------|----------------|--------------------------------|--------------------------------------
`top`               | number               | 6              | Top recent articles            | Show 2 most recent articles `https://github-readme-social-article.vercel.app/devto/tonynguyenit?top=2`
### 3. [Viblo (Vietnamese)](https://viblo.asia/)

- **Recent article by article id**
`https://github-readme-social-article.vercel.app/viblo/tonynguyenit/how-to-show-off-your-social-article-in-github-readme-profile-bWrZnWGmlxw`
![Medium Cards](https://github-readme-social-article.vercel.app/viblo/tonynguyenit/how-to-show-off-your-social-article-in-github-readme-profile-bWrZnWGmlxw)


- **Recent article by index**
`https://github-readme-social-article.vercel.app/viblo/tonynguyenit/1`
![Medium Cards](https://github-readme-social-article.vercel.app/viblo/tonynguyenit/1)

- **List of recent article**
`https://github-readme-social-article.vercel.app/viblo/tonynguyenit?top=2`
![Medium Cards](https://github-readme-social-article.vercel.app/viblo/tonynguyenit?top=2)

**Format**
Use [Common Format](#format)

**Special support**

Queries             | Type                 | Default value  | Description                    |Example
--------------------|----------------------|----------------|--------------------------------|--------------------------------------
`top`               | number               | 2              | Top recent articles            | Show 2 most recent articles `https://github-readme-social-article.vercel.app/viblo/tonynguyenit?top=10`



### How to use?
There are 2 to embed link:

```md
// README.md

![Medium Cards](https://github-readme-social-article.vercel.app/<social-site>/<user-name>/<index>)

OR

<img src="https://github-readme-social-article.vercel.app/<social-site>/<user-name>/<index>">
```

[Live demo](https://github.com/tonynguyenit18)

### Contributing
Contributions are welcome
- Please, feel free to create an issue in [issues](https://github.com/tonynguyenit18/github-readme-social-article/issues) if you see any or want to suggest any improvement.
- If you want to show off your social article from other sites, please create an [issue](https://github.com/tonynguyenit18/github-readme-social-article/issues/new), so I can investigate their apis, or you can create PR (But please create an issue first), if you want to.





