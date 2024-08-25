const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());

var corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));

// GET Endpoint
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// POST Endpoint
app.post("/bfhl", (req, res) => {
  const data = req.body.data || [];
  const userId = "john_doe_17091999";
  const email = "john@xyz.com";
  const rollNumber = "ABCD123";
  const isSuccess = true;

  const numbers = data.filter((item) => !isNaN(item));
  const alphabets = data.filter((item) => /^[a-zA-Z]+$/.test(item));
  const highestLowercase = alphabets
    .filter((item) => /^[a-z]+$/.test(item))
    .sort()
    .reverse();

  res.status(200).json({
    is_success: isSuccess,
    user_id: userId,
    email: email,
    roll_number: rollNumber,
    numbers: numbers,
    alphabets: alphabets,
    highest_lowercase_alphabet: highestLowercase.slice(0, 1),
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
