// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var produce = {
  all: function(cb) {
    orm.all("masterFood", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
//   create: function(cols, vals, cb) {
//     orm.create("masterFood", cols, vals, function(res) {
//       cb(res);
//     });
//   },
//   update: function(objColVals, condition, cb) {
//     orm.update("masterFood", objColVals, condition, function(res) {
//       cb(res);
//     });
//   },
//   delete: function(condition, cb) {
//     orm.delete("masterFood", condition, function(res) {
//       cb(res);
//     });
// }
};

// Export the database functions for the controller (masterFoodController.js).
module.exports = produce;