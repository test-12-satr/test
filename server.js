const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Serve HTML files from public folder
app.use(express.static(path.join(__dirname, "public")));

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.post("/submit", async (req, res) => {
    const { name, place } = req.body;

    const ip =
        req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
        req.socket.remoteAddress ||
        "Unknown";

    const time = new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata"
    });

    const message =
`📋 New Customer Details

👤 Name: ${name}
📍 Place: ${place}
🌐 IP: ${ip}
⏰ Time: ${time}`;

    try {
        await axios.post(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
            {
                chat_id: CHAT_ID,
                text: message
            }
        );

        res.json({
            success: true,
            message: "Data sent successfully"
        });

    } catch (error) {
        console.error(error.response?.data || error.message);

        res.status(500).json({
            success: false,
            message: "Failed to send data"
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
