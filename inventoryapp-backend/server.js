require("dotenv").config();
require("express-async-errors");

const express = require("express");
const connectDB = require("./db/connect");
const cors = require("cors");

// Import routers
const inventoryRouter = require("./routes/inventory");

//App Config
const app = express();
const PORT = process.env.PORT || 8001;


//Middleware
app.use(express.json());
app.use(cors());

// Initialise InventoryRouter
app.use("/inventory", inventoryRouter);

//API Endpoints
app.get("/", (req, res) => res.status(200).send("Welcome"));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

//connect to database
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Port ${PORT} li tia bo?`));
  } catch (error) {
    console.log(error);
  }
};

start();
