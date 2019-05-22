// Import MySQL connection.
var connection = require("../config/connection.js");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";

// This is mostly garbage that doesn't quite apply to this project, but it was in a million activities and other
// burger assignments I researched. I'm leaving it in so it doesn't break something elsewhere.
function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
    console.log(arr.toString());
    
    return arr.toString();
  }
  
  // Helper function to convert object key/value pairs to SQL syntax
  function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }

// Object for all our SQL statement functions
let orm = {
    selectAll: function(table, cb) {
        let queryString = "SELECT * FROM " + table + ";";
        connection.query(queryString, function(err, results) {
            if (err) throw err;
            cb(results);
        });
    },
    insertOne: function(table, column, burgerEntry, cb) {
        let queryString = "INSERT INTO " + table + "(" + column.toString() + ") VALUES (?)"
        console.log('query string: ', queryString)
        // "INSERT INTO BURGERS(burger_name) VALUES(?)"
        connection.query(queryString, [burgerEntry], function(err, results) {
            if (err) throw err;
            cb(results);
        });
    },
    updateOne: function(table, objColVals, condition, cb) {
        let queryString = "UPDATE " + table + " SET " + objToSql(objColVals) + " WHERE " + condition;
        console.log(queryString);
        connection.query(queryString, function(err, results) {
            if (err) throw err;
            cb(results);
        });
    }
};


// Export the orm object for the model (cat.js).
module.exports = orm;