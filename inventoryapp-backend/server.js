const express = require('express')
const connectDB = require('./db/connect')
require('dotenv').config()

// Import routers
const inventoryRouter = require('./routes/inventory')

//App Config
const app = express();
const PORT = process.env.PORT || 8001;

//"mongodb+srv://admin:hello123@cluster0.mhqjs.mongodb.net/?retryWrites=true&w=majority&ssl=true";

//Middleware
app.use(express.json());



// Initialise InventoryRouter
app.use('/inventory', inventoryRouter);

//API Endpoints
app.get("/", (req, res) => res.status(200).send("Welcome"));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

//connect to database
const start = async() => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, () => console.log(`Port ${PORT} li tia bo?`));
  } catch (error) {
    console.log(error)
  }
}

start()
