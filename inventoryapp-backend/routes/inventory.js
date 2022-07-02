const express = require('express')
const { getAllProducts, addProduct } = require('../controllers/products')
const inventoryRouter = express.Router();

// Creates the database entry
// inventoryRouter.post("/", (req, res) => {
//     const dbInventory = req.body;

//     Inventory.create(dbInventory, (err, data) => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             res.status(201).send(data);
//         }
//     });
// });

// Updates the database entry
inventoryRouter.put("/", (req, res) => {

});

// Retrieves the required database entry
// inventoryRouter.get("/", async (req, res) => {
//     Inventory.find((err, data) => {
//         if (err) {
//             res.status(404).send(err);
//         } else {
//             res.status(200).send(data);
//         }
//     });
//     // const product = await Inventory.find({})
//     // res.status(200).json(product)
// });

inventoryRouter.route('/').get(getAllProducts).post(addProduct)

module.exports = inventoryRouter