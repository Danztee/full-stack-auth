const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const stripe = require("stripe")(
  "sk_test_51ND5rBE5eXXS4NHlsp1hPr7GuhlM8bhAwRXXJN6JuUj2dFHGfkX5yR9507q3JdvQhyl9WLuNv0i5dlkMNWbbBHBy00KkKTJJlY"
);
const mongoSanitize = require("express-mongo-sanitize");

const PORT = process.env.PORT || 5000;
const app = express();

connectDB(process.env.MONGO_URI);

app.use(express.json());
app.use(cors());
app.use(mongoSanitize());

app.use("/api/auth", require("./routes/AuthRoute"));

app.post("/api/make-payment", async (req, res) => {
  const { product_name, price, quantity } = req.body;

  try {
    if (!product_name || !price || !quantity)
      throw new Error("please pass in the required fields");

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "ngn",
            product_data: {
              name: product_name,
            },
            unit_amount: +price,
          },
          quantity: +quantity,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:8000/success",
      cancel_url: "http://localhost:8000/cancel",
    });

    res.status(200).json({
      message: "payment checkout created",
      url: session.url,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("welcome to the api");
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
