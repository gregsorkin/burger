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
    insertOne: function(name, cb) {
        orm.insertOne("burgers", ["burger_name", "devoured"], [name, false], cb);
    },

    // Change the devoured state from false to true
    updateOne: function(id, cb) {
        let condition = "id=" + id;
        orm.updateOne("burgers", { devoured: true }, condition, cb); 
    }
};

// Export the model
module.exports = burger;