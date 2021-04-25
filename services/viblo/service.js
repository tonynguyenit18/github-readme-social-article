"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.articleTemplateByUserNameAndArticleId = exports.articleTemplateByUserNameAndIndex = exports.articlesTemplateByUserName = void 0;
const moment_1 = __importDefault(require("moment"));
const vibloSvgTemplate_1 = require("../../utils/svgTemplate/vibloSvgTemplate");
const imgLinkToBase64_1 = require("../../utils/imgLinkToBase64");
const apis_1 = require("./apis");
const defaultVibloImg_1 = require("./defaultVibloImg");
const descriptionMax = 50;
const titleMax = 80;
const removeImageMarkdown = (description) => {
    const imgMarkdownPattern = /!*(\[.*\])*\(.*\)/;
    return description.replace(imgMarkdownPattern, "");
};
const shortenDescription = (description) => {
    const defaultContinue = " Continue reading on Viblo »";
    description = description === null || description === void 0 ? void 0 : description.replace(/<h3>.*<\/h3>|<figcaption>.*<\/figcaption>|<[^>]*>/gm, "").substring(0, descriptionMax);
    if (description.length <= descriptionMax - defaultContinue.length) {
        description += defaultContinue;
    }
    description += "...";
    return description;
};
const getFormattedArticles = async ({ articles }) => {
    const imgLinkBase64Promises = articles.map((article) => imgLinkToBase64_1.imgLinkToBase64(article.thumbnail, defaultVibloImg_1.defaultVibloImg));
    const imgLinkBase64List = await Promise.all(imgLinkBase64Promises);
    const imgLinkBase64Doc = {};
    imgLinkBase64List.forEach(({ link, base64 }) => {
        imgLinkBase64Doc[link] = base64;
    });
    const formattedArticles = articles.map((devtoArticle) => {
        return Object.assign(Object.assign({}, devtoArticle), { title: devtoArticle.title.length > titleMax
                ? devtoArticle.title.substring(0, titleMax).replace("&", "&amp;") + " ..."
                : devtoArticle.title.replace("&", "&amp;"), thumbnail: imgLinkBase64Doc[devtoArticle.thumbnail], date: moment_1.default(devtoArticle.date).format("DD MMM YYYY, HH:mm"), description: shortenDescription(removeImageMarkdown(devtoArticle.description)).replace("&", "&amp;") });
    });
    return formattedArticles;
};
const articlesTemplateByUserName = async ({ username, vibloOptions }) => {
    let recentArticles = await apis_1.vibloRecentArticles({ username: username, vibloOptions });
    if (!recentArticles) {
        return vibloSvgTemplate_1.generateUserNotFoundVibloTemplate({ username });
    }
    else {
        recentArticles = await getFormattedArticles({ articles: recentArticles });
        const template = vibloSvgTemplate_1.generateVibloTemplate({ vibloArticles: recentArticles });
        return template;
    }
};
exports.articlesTemplateByUserName = articlesTemplateByUserName;
const articleTemplateByUserNameAndIndex = async ({ username, articleIndex }) => {
    let recentArticles = await apis_1.vibloRecentArticles({ username: username, vibloOptions: { top: articleIndex + 1 } });
    let template;
    if (!recentArticles[articleIndex]) {
        template = vibloSvgTemplate_1.generateNotFoundVibloTemplate();
    }
    else {
        recentArticles = [recentArticles[articleIndex]];
        recentArticles = await getFormattedArticles({ articles: recentArticles });
        template = vibloSvgTemplate_1.generateVibloTemplate({ vibloArticles: recentArticles });
    }
    return template;
};
exports.articleTemplateByUserNameAndIndex = articleTemplateByUserNameAndIndex;
const articleTemplateByUserNameAndArticleId = async ({ username, articleId }) => {
    let article = await apis_1.vibloArticleByUsernameAndId({ username: username, articleId: articleId });
    let template;
    if (!article) {
        template = vibloSvgTemplate_1.generateNotFoundVibloTemplate();
    }
    else {
        let articles = [article];
        articles = await getFormattedArticles({ articles: articles });
        template = vibloSvgTemplate_1.generateVibloTemplate({ vibloArticles: articles });
    }
    return template;
};
exports.articleTemplateByUserNameAndArticleId = articleTemplateByUserNameAndArticleId;
//# sourceMappingURL=service.js.map