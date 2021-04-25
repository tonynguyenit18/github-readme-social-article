"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vibloRouter = void 0;
const express_1 = __importDefault(require("express"));
const service_1 = require("./service");
const router = express_1.default.Router();
exports.vibloRouter = router;
router.get("/:username", async (req, res) => {
    const { username } = req.params;
    const { top } = req.query;
    const template = await service_1.articlesTemplateByUserName({ username, vibloOptions: { top: top && Number(top) } });
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(template);
});
router.get("/:username/:index", async (req, res) => {
    const { username, index } = req.params;
    let articleIndex = Number(index);
    let template = "";
    if (articleIndex || articleIndex === 0) {
        template = await service_1.articleTemplateByUserNameAndIndex({ username, articleIndex });
    }
    else {
        template = await service_1.articleTemplateByUserNameAndArticleId({ username, articleId: index });
    }
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(template);
});
//# sourceMappingURL=router.js.map