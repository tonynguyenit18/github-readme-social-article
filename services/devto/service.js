"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.articleTemplateByUserNameAndArticleId = exports.articleTemplateByUserNameAndIndex = exports.articlesTemplateByUserName = void 0;
const moment_1 = __importDefault(require("moment"));
const imgLinkToBase64_1 = require("../../utils/imgLinkToBase64");
const svgTemplates_1 = require("../../utils/svgTemplates");
const apis_1 = require("./apis");
const descriptionMax = 50;
const titleMax = 80;
const shortenDescription = (description) => {
    const defaultContinue = " Continue reading on Dev.to »";
    description = description === null || description === void 0 ? void 0 : description.replace(/<h3>.*<\/h3>|<figcaption>.*<\/figcaption>|<[^>]*>/gm, "").substring(0, descriptionMax);
    if (description.length <= descriptionMax - defaultContinue.length) {
        description += defaultContinue;
    }
    description += "...";
    return description;
};
const getFormattedArticles = async ({ articles }) => {
    const imgLinkBase64Promises = articles.map((article) => imgLinkToBase64_1.imgLinkToBase64(article.thumbnail));
    const imgLinkBase64List = await Promise.all(imgLinkBase64Promises);
    const imgLinkBase64Doc = {};
    imgLinkBase64List.forEach(({ link, base64 }) => {
        imgLinkBase64Doc[link] = base64;
    });
    const formattedArticles = articles.map((devtoArticle) => {
        return Object.assign(Object.assign({}, devtoArticle), { title: devtoArticle.title.length > titleMax
                ? devtoArticle.title.substring(0, titleMax).replace("&", "&amp;") + " ..."
                : devtoArticle.title.replace("&", "&amp;"), thumbnail: imgLinkBase64Doc[devtoArticle.thumbnail], date: moment_1.default(devtoArticle.date).format("DD MMM YYYY, HH:mm"), description: shortenDescription(devtoArticle.description).replace("&", "&amp;") });
    });
    return formattedArticles;
};
const articlesTemplateByUserName = async ({ userName, devtoOptions }) => {
    let recentArticles = await apis_1.devtoRecentArticles({ userName: userName, devtoOptions: devtoOptions });
    recentArticles = await getFormattedArticles({ articles: recentArticles });
    const template = svgTemplates_1.generateDevtoTemplate({ devtoArticles: recentArticles });
    return template;
};
exports.articlesTemplateByUserName = articlesTemplateByUserName;
const articleTemplateByUserNameAndIndex = async ({ userName, articleIndex }) => {
    let recentArticles = await apis_1.devtoRecentArticles({ userName: userName, devtoOptions: { top: articleIndex + 1 } });
    recentArticles = [recentArticles[articleIndex]];
    recentArticles = await getFormattedArticles({ articles: recentArticles });
    const template = svgTemplates_1.generateDevtoTemplate({ devtoArticles: recentArticles });
    return template;
};
exports.articleTemplateByUserNameAndIndex = articleTemplateByUserNameAndIndex;
const articleTemplateByUserNameAndArticleId = async ({ userName, articleId }) => {
    let article = await apis_1.devtoArticleByUsernameAndId({ userName: userName, articleId: articleId });
    let articles = [article];
    articles = await getFormattedArticles({ articles: articles });
    const template = svgTemplates_1.generateDevtoTemplate({ devtoArticles: articles });
    return template;
};
exports.articleTemplateByUserNameAndArticleId = articleTemplateByUserNameAndArticleId;
//# sourceMappingURL=service.js.map