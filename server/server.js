require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const apiKey = process.env.API_KEY;

const app = express();
const port = 3000;

app.use(express.json());
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
  })
);

app.post("/completions", async (req, res) => {
  try {
    const code = req.body.code;

    const options = {
      method: "POST",
      url: "https://openai80.p.rapidapi.com/chat/completions",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "openai80.p.rapidapi.com",
        "Accept-Encoding": "gzip, deflate",
      },
      data: {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `optimize the below code and make it shotest as possible do not generate any description ${code}`,
          },
        ],
      },
    };

    const response = await axios.request(options);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred.");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
