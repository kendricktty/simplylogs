import express from "express";
import Inventory from "../dbInventory.js";

const inventoryRouter = express.Router();

// Creates the database entry
inventoryRouter.post("/", (req, res) => {
    const dbInventory = req.body;

    Inventory.create(dbInventory, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

// Updates the database entry
inventoryRouter.put("/", (req, res) => {

});

// Retrieves the required database entry
inventoryRouter.get("/", (req, res) => {
    Inventory.find((err, data) => {
        if (err) {
            res.status(404).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

export default inventoryRouter;