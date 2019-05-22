// Dependencies
const express = require("express");
const router = express.Router();
const burger = require("../models/burger");

// Routes
router.get("/", function(req, res) {
   res.redirect("/burgers");
});

// Index
router.get("/burgers", function(req, res) {
    burger.selectAll(function(data) {
        let hbsObj = { burgers: data};
        res.render("index", hbsObj);
    });
});

// Add a new burger
router.post("/burgers/create", function(req, res) {
    burger.insertOne(req.body.burger_name, function(result) {
        console.log(result)
        res.redirect("/");
    });
});

// Eat a burger
router.put("/burgers/:id", function(req, res) {
    burger.updateOne(req.params.id, function(result) {
        console.log(result);
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// Export
module.exports = router;