import express from "express";
import Inventory from "../dbInventory.js";

const authenticator = express.Router();


const login = (req, res, next) => {

}

authenticator.post("/", login);