import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";


const app = express();
const SERVER_PORT = 3000;
const uploadImageDir = path.join(process.cwd(), "src", "upload", "img");


app.use(cors());
app.use(express.json());
app.use("/upload/img", express.static(uploadImageDir));

app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
});