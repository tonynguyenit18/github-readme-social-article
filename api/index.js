"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const router_1 = require("../services/medium/router");
const router_2 = require("../services/devto/router");
const router_3 = require("../services/viblo/router");
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.get("/health", (req, res) => {
    res.send("Healthy");
});
app.use("/medium", router_1.mediumRouter);
app.use("/devto", router_2.devtoRouter);
app.use("/viblo", router_3.vibloRouter);
module.exports = app;
//# sourceMappingURL=index.js.map