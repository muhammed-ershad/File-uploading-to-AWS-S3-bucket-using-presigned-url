import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import {
  generatePresignedUrlForFileUpload,
} from "./url.generating.functions.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve the index.html file from the root directory
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/put-presigned-url", async (req, res) => {
  const { fileName } = req.body;
  const response = await generatePresignedUrlForFileUpload(fileName);
  if (response) res.json({ success: true, data: response });
  else res.json({ success: false });
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port ${process.env.PORT || 4000}`);
});
