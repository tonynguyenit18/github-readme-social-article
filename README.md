# github-readme-social-article

Show your social article on github readme profile

> This repo is inspired by [github-readme-medium-recent-article](https://github.com/bxcodec/github-readme-medium-recent-article).

### Current support
1. [Medium](https://medium.com/)

- **Recent article by article id**
`https://github-readme-social-article.vercel.app/medium/@tonynguyenit/pixelate-images-and-html-element-in-react-78d4120357ad`
![Medium Cards](https://github-readme-social-article.vercel.app/medium/@tonynguyenit/pixelate-images-and-html-element-in-react-78d4120357ad)


- **Recent article by index**
`https://github-readme-social-article.vercel.app/medium/@tonynguyenit/0`
![Medium Cards](https://github-readme-social-article.vercel.app/medium/@tonynguyenit/0)

- **List of recent article**
`https://github-readme-social-article.vercel.app/medium/@tonynguyenit`
![Medium Cards](https://github-readme-social-article.vercel.app/medium/@tonynguyenit)

2. [Devto](https://dev.to/)

- **Recent article by article id**
`https://github-readme-social-article.vercel.app/devto/tonynguyenit/how-to-show-off-your-social-article-in-github-readme-profile-131o`
![Medium Cards](https://github-readme-social-article.vercel.app/devto/tonynguyenit/how-to-show-off-your-social-article-in-github-readme-profile-131o)


- **Recent article by index**
`https://github-readme-social-article.vercel.app/devto/tonynguyenit/1`
![Medium Cards](https://github-readme-social-article.vercel.app/devto/tonynguyenit/1)

- **List of recent article**
`https://github-readme-social-article.vercel.app/devto/tonynguyenit?top=2`
![Medium Cards](https://github-readme-social-article.vercel.app/devto/tonynguyenit?top=2)

### Usage

##### 1. Medium
 **Format:**
- **Recent article by index**
`https://github-readme-social-article.vercel.app/<social-site>/<user-name>/<article-id>`

- **Recent article by index**
`https://github-readme-social-article.vercel.app/<social-site>/<user-name>/<index>`

- **List of recent article**
`https://github-readme-social-article.vercel.app/<social-site>/<user-name>`


Params                |Social site support    |Description                      |Note                           |example
----------------------|----------------------|---------------------------------|-------------------------------|----------
`<social-site>`       |`medium` `devto`      | name of social site             |Currently only support `medium` and `devto`| `medium`
`<user-name>`         |`medium` `devto`      | your user name in the social site|                             | `@tonynguyenit`
`<index>`             |`medium` `devto`      | Index of the article         | Currently, Medium support maximum 10 articles| `0`
`<article-id>`        |`medium` `devto`      | Unique article id from the social site | After publish the article will have a unique id | `pixelate-images-and-html-element-in-react-78d4120357ad`

#### Special support
1. Devto

Queries             | Type                 | Default value  | Description                    |Example
--------------------|----------------------|----------------|--------------------------------|--------------------------------------
`top`               | number               | 6              | Top recent articles            | Show 2 most recent articles `https://github-readme-social-article.vercel.app/devto/tonynguyenit?top=2`



##### How to use?
There are 2 to embed link:

```md
// README.md

![Medium Cards](https://github-readme-social-article.vercel.app/<social-site>/<user-name>/<index>)

OR

<img src="https://github-readme-social-article.vercel.app/<social-site>/<user-name>/<index>">
```

[Live demo](https://github.com/tonynguyenit18)





