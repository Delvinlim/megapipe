import express from "express";
import db from "./config/Database.js";
import router from "./routes/index.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import modelSync from "./models/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
try {
  await db.authenticate();
  console.log("Database connected....");
  // await modelSync();
} catch (error) {
  console.log("Database connection failed....");
  console.error(error);
}

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
// app.use(cors({ credentials: true, origin: "*" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.use(router);
app.listen(5000, () => console.log("Server running at port 5000"));
