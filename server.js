require("dotenv").config();
require("express-async-errors");

const express = require("express");
const connectDB = require("./db/connect");
const cors = require("cors");

//Import error handlers
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');
const authenticateUser = require('./middleware/authentication')

// Import routers
const inventoryRouter = require("./routes/inventory");
const orderRouter = require("./routes/order")
const authRouter = require("./routes/auth")

//App Config
const app = express();
const PORT = process.env.PORT || 8001;


//Middleware
app.use(express.json());
app.use(cors());


if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}



// Initialise InventoryRouter
app.use("/auth", authRouter)
app.use("/inventory", authenticateUser,inventoryRouter);
app.use("/order", authenticateUser,orderRouter)

//API Endpoints
// app.get("/", (req, res) => res.status(200).send("Welcome"));

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
