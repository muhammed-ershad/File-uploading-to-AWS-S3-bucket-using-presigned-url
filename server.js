import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { generatePresignedUrlForFileUpload, generatePresignedUrlForFileDownload } from "./url.generating.functions.js";



dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));        

app.post('/put-presigned-url', async (req, res) => {
    const { fileName } = req.body
    const response = await generatePresignedUrlForFileUpload(fileName);
    if(response) res.json({ success: true, data: response });
    else res.json({ success: false });
})

app.post('/get-presigned-url', async (req, res) => {
    const { fileName } =  req.body
    const presignedUrl = await generatePresignedUrlForFileDownload(fileName);
    if(presignedUrl) res.json({ success: true, data: presignedUrl });
    else res.json({ success: false });
})


app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is running on port ${process.env.PORT || 4000}`);
});
