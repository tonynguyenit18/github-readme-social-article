"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.devtoArticleByUsernameAndId = exports.devtoRecentArticles = void 0;
const axios_1 = __importDefault(require("axios"));
const devtoArticlesEndpoint = "https://dev.to/api/articles";
const devtoRecentArticles = async ({ userName, devtoOptions }) => {
    const { top = 6 } = devtoOptions;
    let { data } = await axios_1.default.get(`${devtoArticlesEndpoint}?username=${userName}&per_page=${top}`);
    const devtoArticles = data.map((rawArticle) => {
        return {
            title: rawArticle.cover_image ? rawArticle.title : "",
            thumbnail: rawArticle.social_image,
            url: rawArticle.url,
            date: rawArticle.created_at,
            description: rawArticle.description
        };
    });
    return devtoArticles;
};
exports.devtoRecentArticles = devtoRecentArticles;
const devtoArticleByUsernameAndId = async ({ userName, articleId }) => {
    let { data = {} } = await axios_1.default.get(`${devtoArticlesEndpoint}/${userName}/${articleId}`);
    const devtoArticle = {
        title: data.cover_image ? data.title : "",
        thumbnail: data.social_image,
        url: data.url,
        date: data.created_at,
        description: data.description
    };
    return devtoArticle;
};
exports.devtoArticleByUsernameAndId = devtoArticleByUsernameAndId;
//# sourceMappingURL=apis.js.map