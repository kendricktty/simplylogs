require("dotenv").config();
require("express-async-errors");

const express = require("express");
const connectDB = require("./db/connect");
const cors = require("cors");
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

// Import routers
const inventoryRouter = require("./routes/inventory");
const orderRouter = require("./routes/order")

//App Config
const app = express();
const PORT = process.env.PORT || 8001;


//Middleware
app.use(express.json());
app.use(cors());


// Initialise InventoryRouter
app.use("/inventory", inventoryRouter);
app.use("/order", orderRouter)

//API Endpoints
app.get("/", (req, res) => res.status(200).send("Welcome"));

//error handler
app.use(notFoundMiddleware);
app.use(errorMiddleware);

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
