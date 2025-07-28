import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// ✅ Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// ✅ Use credentials from .env
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

app.post("/contact", async (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: `"Portfolio Contact" <${email}>`,
        to: process.env.EMAIL_USER,
        subject: `📬 Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true });
    } catch (err) {
        console.error("❌ Email error:", err);
        res.status(500).json({ success: false });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
