"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.get("/", function (request, response) {
    response.send("Hello!");
});
app.listen(process.env.PORT, function () {
    console.log("Application started at port 3000");
});
//# sourceMappingURL=index.js.map