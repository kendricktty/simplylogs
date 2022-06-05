import express from "express"
import mongoose from "mongoose"
import Cors from "cors"
import Inventory from "./dbInventory.js"

//App Config
const app = express()
const port = process.env.PORT || 8001
const connection_url = 'mongodb+srv://admin:hello123@cluster0.mhqjs.mongodb.net/?retryWrites=true&w=majority'

//Middleware
app.use(express.json())
app.use(Cors())

//DB Config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


//API Endpoints
app.get("/", (req, res) => res.status(200).send("Welcome"))

app.post("/inventory", (req, res) => {
    const dbInventory = req.body

    Inventory.create(dbInventory, (err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.get("/inventory", (req, res) => {
    Inventory.find((err,data) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data)
        }
    })
})

//Listener
app.listen(port, () => console.log(`listening on localhost:${port}`))