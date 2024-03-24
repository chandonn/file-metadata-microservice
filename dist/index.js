"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
dotenv_1.default.config();
// create app server
const app = (0, express_1.default)();
// init multer with default configs
const upload = (0, multer_1.default)();
// config cors
app.use((0, cors_1.default)());
// configs what will be used around the service
aws_sdk_1.default.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
// instantiate AWS
const amazon = new aws_sdk_1.default.S3();
// serves public folder statically
app.use("/public", express_1.default.static(path_1.default.join(process.cwd(), "public")));
// serves the main view to the home get endpoint
app.get("/", function (_, response) {
    response.sendFile(path_1.default.join(process.cwd(), "views", "index.html"));
});
app.post("/api/fileanalyse", upload.single("upfile"), function (request, response) {
    const name = request.file.originalname;
    const type = request.file.mimetype;
    const size = request.file.size;
    const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: name,
        Body: request.file.buffer
    };
    amazon.upload(params, (error, data) => {
        if (error) {
            console.log("Error ocurred", error);
            response.status(500).json({ error: "Server error" });
        }
        else {
            console.log("File uploaded with success", data);
            response.status(200).json({ message: "The file was added with success", name, type, size });
        }
    });
});
app.listen(process.env.PORT, function () {
    console.log("App is running");
});
//# sourceMappingURL=index.js.map