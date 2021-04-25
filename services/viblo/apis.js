"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vibloArticleByUsernameAndId = exports.vibloRecentArticles = void 0;
const axios_1 = __importDefault(require("axios"));
const vibloEndpoint = "https://api.viblo.asia";
const reqbinEndpoint = "https://apius.reqbin.com/api/v1/requests";
const fetchViblo = async (url) => {
    console.log("Viblo url", url);
    const postData = JSON.stringify({
        id: "0",
        name: "",
        errors: "",
        json: JSON.stringify({
            method: "GET",
            url: url,
            apiNode: "US",
            contentType: "",
            content: "",
            headers: "",
            errors: "",
            curlCmd: "",
            auth: {
                auth: "noAuth",
                bearerToken: "",
                basicUsername: "",
                basicPassword: "",
                customHeader: "",
                encrypted: ""
            },
            compare: false,
            idnUrl: url
        }),
        sessionId: new Date().getTime()
    });
    const response = await axios_1.default.post(reqbinEndpoint, postData, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return JSON.parse(response.data.Content);
};
const vibloRecentArticles = async ({ username, vibloOptions }) => {
    try {
        const { top = 2 } = vibloOptions || {};
        const data = await fetchViblo(`${vibloEndpoint}/users/${username}/posts`);
        const rawArticles = data.data;
        const topRawArticles = rawArticles.length > top ? rawArticles.slice(0, top) : rawArticles;
        const vibloArticles = topRawArticles.map((rawArticle) => {
            return {
                title: rawArticle.title,
                thumbnail: rawArticle.thumbnail_url
                    ? `https://res.cloudinary.com/demo/image/fetch/w_400,c_scale/${rawArticle.thumbnail_url}`
                    : "https://res.cloudinary.com/demo/image/fetch/w_400,c_scale/https%3A%2F%2Fviblo.asia%2Fog-facebook-3.png",
                url: rawArticle.url,
                date: rawArticle.published_at,
                description: rawArticle.contents_short
            };
        });
        return vibloArticles;
    }
    catch (error) {
        console.log("vibloRecentArticles", error);
        return;
    }
};
exports.vibloRecentArticles = vibloRecentArticles;
const generateSlug = (articleId) => {
    return articleId === null || articleId === void 0 ? void 0 : articleId.split("-").slice(-1)[0];
};
const vibloArticleByUsernameAndId = async ({ username, articleId }) => {
    var _a, _b, _c, _d;
    try {
        articleId = generateSlug(articleId);
        const data = await fetchViblo(`${vibloEndpoint}/posts/${articleId}`);
        const rawArticle = ((_a = data === null || data === void 0 ? void 0 : data.post) === null || _a === void 0 ? void 0 : _a.data) || {};
        if (username !== ((_c = (_b = rawArticle.user) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.username))
            return;
        const vibloArticle = {
            title: rawArticle.title,
            thumbnail: rawArticle.thumbnail_url
                ? `https://res.cloudinary.com/demo/image/fetch/w_400,c_scale/${rawArticle.thumbnail_url}`
                : "https://res.cloudinary.com/demo/image/fetch/w_400,c_scale/https%3A%2F%2Fviblo.asia%2Fog-facebook-3.png",
            url: rawArticle.canonical_url,
            date: rawArticle.published_at,
            description: (_d = rawArticle.seo) === null || _d === void 0 ? void 0 : _d.description
        };
        return vibloArticle;
    }
    catch (error) {
        console.log("vibloArticleByUsernameAndId", error);
        return;
    }
};
exports.vibloArticleByUsernameAndId = vibloArticleByUsernameAndId;
//# sourceMappingURL=apis.js.map