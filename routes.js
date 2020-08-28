"use strict";

console.log("routes");
// require the axpress module:
const express = require("express");

// create a new Router object:
const routes = express.Router();

exports.items;

const items = [
  {
    id: 1,
    product: "Banana",
    price: 0.25,
    quantity: 6,
  },
  {
    id: 2,
    product: "Can of Tuna",
    price: 3.5,
    quantity: 2,
  },
  {
    id: 3,
    product: "Cereal",
    price: 5.25,
    quantity: 1,
  },
  {
    id: 4,
    product: "Potato",
    price: 0.75,
    quantity: 12,
  },
];
let nextId = 5;

// ---------------------1--------------------------
// get items by setting max price
//
// parseFloat might return true-er numbers  v v v v
routes.get("/cart-items", (req, res) => {
  let filteredItems = items;
  const maxPrice = parseInt(req.query.maxPrice);
  if (maxPrice) {
    filteredItems = filteredItems.filter((item) => item.price <= maxPrice);
  }
  const preFix = req.query.preFix;
  if (preFix) {
    filteredItems = filteredItems.filter((item) =>
      item.product.startsWith(preFix)
    );
  }
  const pageSize = parseInt(req.query.pageSize);
  if (pageSize) {
    filteredItems = filteredItems.slice(0, pageSize);
  }
  res.status(200);
  // this calls the whole array of items v v
  res.json(filteredItems);
});
//
// ---------------------2--------------------------
// -------item by id-------------
routes.get("/cart-items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const itemByID = items.find((item) => item.id === id);
  if (itemByID) {
    res.json(itemByID);
    res.status(200);
  }
  res.status(404);
  res.send(`ID ${id} not found`);
});
//
// ---------------------3--------------------------
// ADDING AN ITEM
routes.post("/cart-items", (req, res) => {
  const item = req.body;
  item.id = nextId++;
  items.push(item);
  res.status(201);
  res.json(item);
});
//
// ---------------------4--------------------------
// UPDATING AN ITEM
routes.put("/cart-items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = req.body;
  const index = items.findIndex((item) => item.id === id);
  items[index] = item;
  res.status(200);
  res.json(item);
});
//
// ---------------------5--------------------------
// DELETING AN ITEM
routes.delete("/cart-items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex((item) => item.id === id);
  if (index !== -1) {
    items.splice(index, 1);
  }
  res.status(204);
  res.send();
});
//
// ------------------------------------------------
//
// export the routes to use in server.js v v v
module.exports = routes;
