"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imgLinkToBase64 = void 0;
const axios_1 = __importDefault(require("axios"));
const imgLinkToBase64 = async (link, defaultBase64) => {
    var _a;
    try {
        const response = await axios_1.default.get(link, {
            responseType: "arraybuffer"
        });
        const rawImage = response.data;
        const imageType = (_a = response === null || response === void 0 ? void 0 : response.headers) === null || _a === void 0 ? void 0 : _a["content-type"];
        const base64Img = Buffer.from(rawImage).toString("base64");
        const base64 = `data:${imageType};base64,${base64Img}`;
        return { link, base64 };
    }
    catch (error) {
        return { link, base64: defaultBase64 };
    }
};
exports.imgLinkToBase64 = imgLinkToBase64;
//# sourceMappingURL=imgLinkToBase64.js.map