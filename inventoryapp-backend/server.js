require("dotenv").config();
require("express-async-errors");

// Import error handlers
const express = require("express");
const connectDB = require("./db/connect");
const cors = require("cors");
const notFound = require('./middleware/not-found');
const genericError = require('./middleware/generic-error');
const validationError = require("./middleware/validationError");

// Import routers
const inventoryRouter = require("./routes/inventory");
const orderRouter = require("./routes/order");
const dashboardRouter = require("./routes/dashboard");
const productFilterRouter = require("./routes/filter/product");
const orderFilterRouter = require("./routes/filter/order");

//App Config
const app = express();
const PORT = process.env.PORT || 8001;


//Middleware
app.use(express.json());
app.use(cors());

// Initialise InventoryRouter
app.use("/inventory", inventoryRouter);
app.use("/order", orderRouter)
app.use("/dashboard", dashboardRouter);

app.use("/filter/inventory", productFilterRouter);
app.use("/filter/order", orderFilterRouter);

//API Endpoints
app.get("/", (req, res) => res.status(200).send("Welcome"));

//error handler
app.use(validationError);
app.use(notFound);
app.use(genericError);

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
