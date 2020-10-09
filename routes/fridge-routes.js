var express = require("express");

var router = express.Router();

// Import the model (produce.js) to use its database functions.
var produce = require("../models/fridge.js");

// Create all our routes and set up logic within those routes where required.
router.get("/members", function(req, res) {
  produce.all(function(data) {
    var hbsObject = {
      masterFood: data
    };
    console.log(hbsObject);
    res.render("components/members-template", hbsObject);
  });
});

// router.post("/api/masterFood", function(req, res) {
//   produce.create([
//     "name", "sleepy"
//   ], [
//     req.body.name, req.body.sleepy
//   ], function(result) {
//     // Send back the ID of the new quote
//     res.json({ id: result.insertId });
//   });
// });

// router.put("/api/masterFood/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   console.log("condition", condition);

//   produce.update({
//     sleepy: req.body.sleepy
//   }, condition, function(result) {
//     if (result.changedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

// router.delete("/api/masterFood/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   produce.delete(condition, function(result) {
//     if (result.affectedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

// Export routes for server.js to use.
module.exports = router;