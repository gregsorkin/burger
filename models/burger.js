// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

// The code that will call the ORM functions using burger-specific input for the ORM
let burger = {
    // Display all burgers in the db
    selectAll: function(cb) {
        orm.selectAll("burgers", function(res) {
            cb(res);
        });
    },

    // Add a new burger to the db
    insertOne: function(burger_name, cb) {
        orm.insertOne(burger_name, function(res) {
            cb(res);
        });
    },

    // Change the devoured state from false to true
    updateOne: function(burger_id, cb) {
        orm.updateOne(burger_id, function(res) {
            cb(res);
        });
    }
};

// Export the model
module.exports = burger;