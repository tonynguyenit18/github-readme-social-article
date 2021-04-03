# github-readme-social-article

Show your social article on github readme profile

> This repo is inspired by [github-readme-medium-recent-article](https://github.com/bxcodec/github-readme-medium-recent-article).

### Current support
1. [Medium](https://medium.com/)

- Recent article by index
![Medium Cards](https://github-readme-social-article.vercel.app/medium/@tonynguyenit/0)

- List of recent article
![Medium Cards](https://github-readme-social-article.vercel.app/medium/@tonynguyenit)

### Usage

##### Format:
- Recent article by index
`https://github-readme-social-article.vercel.app/<social-site>/<user-name>/<index>`

- List of recent article
`https://github-readme-social-article.vercel.app/<social-site>/<user-name>`

Params                |Description                      |Note                           |example
----------------------|---------------------------------|-------------------------------|----------
`<social-site>`       | name of social site             |Currently only support `medium`| `medium`
`<user-name>`         | your user name in the social site|                             | `@tonynguyenit`
`<index>`             | Index of the article         | Currently, Medium support maximum 9 articles| `0`

##### How to use?
There are 2 to embed link:

```md
// README.md

![Medium Cards](https://github-readme-social-article.vercel.app/<social-site>/<user-name>/<index>)

OR

<img src="https://github-readme-social-article.vercel.app/<social-site>/<user-name>/<index>">
```

[Live demo](https://github.com/tonynguyenit18)





