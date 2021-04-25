"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.devtoRouter = void 0;
const express_1 = __importDefault(require("express"));
const service_1 = require("./service");
const router = express_1.default.Router();
exports.devtoRouter = router;
router.get("/:userName", async (req, res) => {
    const { userName } = req.params;
    const { top } = req.query;
    const template = await service_1.articlesTemplateByUserName({ userName, devtoOptions: { top: top && parseInt(top) } });
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(template);
});
router.get("/:userName/:index", async (req, res) => {
    const { userName, index } = req.params;
    let articleIndex = Number(index);
    let template = "";
    if (articleIndex || articleIndex === 0) {
        template = await service_1.articleTemplateByUserNameAndIndex({ userName, articleIndex });
    }
    else {
        template = await service_1.articleTemplateByUserNameAndArticleId({ userName, articleId: index });
    }
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(template);
});
//# sourceMappingURL=router.js.map