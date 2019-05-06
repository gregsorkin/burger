// Dependencies
const express = require("express");
const router = express.Router();
const burger = require("../models/burger");

// Routes
router.get("/", function(req, res) {
    res.redirect("/burger");
});

// Index
router.get("/burger", function(req, res) {
    burger.selectAll(function(data) {
        let hbsObj = { burgers: data};
        res.render("index", hbsObj);
    });
});

// Add a new burger
router.post("/burger/create", function(req, res) {
    burger.insertOne(req.body.burger_name, function() {
        res.redirect("/index");
    });
});

// Eat a burger
router.post("/burger/eat/:id", function(req, res) {
    burger.updateOne(req.params.id, function() {
        res.redirect("/index");
    });
});

// Export
module.exports = router;