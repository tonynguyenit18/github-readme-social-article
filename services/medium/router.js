"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediumRouter = void 0;
const express_1 = __importDefault(require("express"));
const svgTemplates_1 = require("../../utils/svgTemplates");
const apis_1 = require("./apis");
const imgLinkToBase64_1 = require("../../utils/imgLinkToBase64");
const router = express_1.default.Router();
exports.mediumRouter = router;
const getTemplate = async ({ userName, articleIndex }) => {
    let recentArticles = await apis_1.mediumRecentArticles({ userName, index: articleIndex });
    const imgLinkBase64Promises = recentArticles.map((article) => imgLinkToBase64_1.imgLinkToBase64(article.thumbnail));
    const imgLinkBase64List = await Promise.all(imgLinkBase64Promises);
    const imgLinkBase64Doc = {};
    imgLinkBase64List.forEach(({ link, base64 }) => {
        imgLinkBase64Doc[link] = base64;
    });
    recentArticles = recentArticles.map((mediumArticle) => {
        return Object.assign(Object.assign({}, mediumArticle), { thumbnail: imgLinkBase64Doc[mediumArticle.thumbnail] });
    });
    const template = svgTemplates_1.generateMediumTemplate({ mediumArticles: recentArticles });
    return template;
};
const getTemplateById = async ({ userName, articleId }) => {
    let article = await apis_1.mediumArticleById({ userName, articleId });
    const thumbNailBase64 = await imgLinkToBase64_1.imgLinkToBase64(article.thumbnail);
    article = Object.assign(Object.assign({}, article), { thumbnail: thumbNailBase64.base64 });
    const template = svgTemplates_1.generateMediumTemplate({ mediumArticles: [article] });
    return template;
};
router.get("/:userName", async (req, res) => {
    const { userName } = req.params;
    const template = await getTemplate({ userName });
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(template);
});
router.use("/:userName/:index", async (req, res) => {
    const { userName, index } = req.params;
    let articleIndex = Number(index);
    let template;
    if (articleIndex || articleIndex === 0) {
        template = await getTemplate({ userName, articleIndex });
    }
    else {
        template = await getTemplateById({ userName, articleId: index });
    }
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(template);
});
//# sourceMappingURL=router.js.map