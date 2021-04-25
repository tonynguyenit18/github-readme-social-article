"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediumArticleById = exports.mediumRecentArticles = void 0;
const axios_1 = __importDefault(require("axios"));
const moment_1 = __importDefault(require("moment"));
const getThumbnailFromRawArticleParagraphsJson = (rawParagraphs) => {
    var _a;
    let thumbnailUrlId;
    for (let i = 0; i < rawParagraphs.length; i++) {
        const paragraph = rawParagraphs[i];
        if ((paragraph === null || paragraph === void 0 ? void 0 : paragraph.type) === 4) {
            thumbnailUrlId = (_a = paragraph.metadata) === null || _a === void 0 ? void 0 : _a.id;
            break;
        }
    }
    const thumbnailUrl = `https://miro.medium.com/max/150/${thumbnailUrlId}`;
    return thumbnailUrl;
};
const shortenDescription = (description) => {
    const defaultContinue = " Continue reading on Medium »";
    description = description === null || description === void 0 ? void 0 : description.replace(/<h3>.*<\/h3>|<figcaption>.*<\/figcaption>|<[^>]*>/gm, "").substring(0, 60);
    if (description.length <= 60 - defaultContinue.length) {
        description += defaultContinue;
    }
    description += "...";
    return description;
};
const mediumRecentArticles = async ({ userName, index }) => {
    const rssUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/${userName}`;
    const { data } = await axios_1.default.get(rssUrl);
    let { items } = data || {};
    if (index || index === 0) {
        items = [items === null || items === void 0 ? void 0 : items[index]];
    }
    const recentArticle = items === null || items === void 0 ? void 0 : items.map(({ title, thumbnail, link, pubDate, description }) => {
        return {
            title: title,
            thumbnail: thumbnail,
            url: link,
            date: moment_1.default(pubDate).format("DD MMM YYYY, HH:mm"),
            description: shortenDescription(description)
        };
    });
    return recentArticle;
};
exports.mediumRecentArticles = mediumRecentArticles;
const mediumArticleById = async ({ userName, articleId }) => {
    var _a, _b, _c, _d;
    const mediumUrl = `https://medium.com/${userName}/${articleId}?format=json`;
    let { data: dataString } = await axios_1.default.get(mediumUrl);
    const pattern = /^[\w|\W]*?(\{[\w|\W]*)$/gi;
    pattern.test(dataString);
    dataString = RegExp.$1;
    dataString.replace(`\\"`, "");
    const rawArticle = JSON.parse(dataString);
    const articleValue = ((_a = rawArticle === null || rawArticle === void 0 ? void 0 : rawArticle.payload) === null || _a === void 0 ? void 0 : _a.value) || {};
    const title = articleValue.title;
    const thumbnail = getThumbnailFromRawArticleParagraphsJson((_c = (_b = articleValue.content) === null || _b === void 0 ? void 0 : _b.bodyModel) === null || _c === void 0 ? void 0 : _c.paragraphs);
    const url = articleValue.mediumUrl;
    const mediumArticle = {
        title: title,
        thumbnail: thumbnail,
        url: url,
        date: moment_1.default(articleValue.firstPublishedAt).format("DD MMM YYYY, HH:mm"),
        description: shortenDescription((_d = articleValue === null || articleValue === void 0 ? void 0 : articleValue.content) === null || _d === void 0 ? void 0 : _d.subtitle)
    };
    return mediumArticle;
};
exports.mediumArticleById = mediumArticleById;
//# sourceMappingURL=apis.js.map