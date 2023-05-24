const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const app = express();

connectDB(process.env.MONGO_URI);
app.use(express.json());

app.use(cors());

app.use("/api/auth", require("./routes/AuthRoute"));

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
