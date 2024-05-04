const express = require("express");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const database = require("./config/database");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000;

const jwtSecret = "your_jwt_secret";




app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "password") {
    const token = jwt.sign({ username }, jwtSecret, { expiresIn: "1h" });
    return res.json({ message: "Authentication successful!", token });
  } else {
    return res.status(401).json({ message: "Authentication failed!" });
  }
});

database.initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`App running on PORT ${PORT}`);
  });
});
