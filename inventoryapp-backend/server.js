import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import dbInventory from "./model/dbInventory.js";
import errorHandler from "./handlers/errorHandler.js";
import connectDB from "./db/connect.js"
import env from "dotenv"

env.config()

// Import routers
import inventoryRouter from "./routers/InventoryRouter.js"

//App Config
const app = express();
const PORT = process.env.PORT || 8001;
const connection_url =
  "mongodb://admin:hello123@cluster0-shard-00-00.mhqjs.mongodb.net:27017,cluster0-shard-00-01.mhqjs.mongodb.net:27017,cluster0-shard-00-02.mhqjs.mongodb.net:27017/?ssl=true&replicaSet=atlas-1bssey-shard-0&authSource=admin&retryWrites=true&w=majority";

//"mongodb+srv://admin:hello123@cluster0.mhqjs.mongodb.net/?retryWrites=true&w=majority&ssl=true";

//Middleware
app.use(express.json());
app.use(Cors());

//DB Config
connectDB(process.env.MONGO_URI)

// Initialise InventoryRouter
app.use('/inventory', inventoryRouter);

//API Endpoints
app.get("/", (req, res) => res.status(200).send("Welcome"));

// Creates the database entry
inventoryRouter.post("/", (req, res) => {
  const dbInventory = req.body;

  Inventory.create(dbInventory, (err, data) => {
    errorHandler(res, err, data);
    console.log("post");
  });
});

// Posts a new database entry
inventoryRouter.post("/:id", (req, res) => {
  
});

// Retrieves the required database entry
inventoryRouter.get("/", (req, res) => {
  Inventory.find((err, data) => {
    errorHandler(res, err, data);
  });
});

//Listener
app.listen(PORT, () => console.log(`Port ${PORT} li tia bo?`));
