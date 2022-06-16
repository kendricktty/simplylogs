import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import Inventory from "./dbInventory.js";
import errorHandler from "./handlers/errorHandler.js";

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
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//API Endpoints
app.get("/", (req, res) => res.status(200).send("Welcome"));

// Creates the database entry
app.post("/inventory", (req, res) => {
  const dbInventory = req.body;

  Inventory.create(dbInventory, (err, data) => {
    errorHandler(res, err, data);
    console.log("post");
  });
});

// Posts a new database entry
app.post("/inventory/:id", (req, res) => {
  
});

// Retrieves the required database entry
app.get("/inventory", (req, res) => {
  Inventory.find((err, data) => {
    errorHandler(res, err, data);
  });
});

//Listener
app.listen(PORT, () => console.log(`Port ${PORT} li tia bo?`));
