// Requiring our models and passport as we've configured it
const db = require("../models");

module.exports = function(app) {

  // GET route for getting all of the items
  app.get("/api/items", function(req, res) {
    var query = {};

     if (!req.user) {
         // The user is not logged in, send back an empty object
         res.json({});
       } else {
        query.UserId = req.user.id;
         db.masterFoods.findAll({
            where: query
          // include: [db.Users]
        }).then(function(dbItem) {
          res.json(dbItem);
        });
       }

   });

  // Get route for retrieving a single post
  app.get("/api/items/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Users
    var query ={};
    if (!req.user) {
        // The user is not logged in, send back an empty object
        res.json({});
      } else {

    db.masterFoods.findOne({
        where: {
            id: req.params.id
        },
        include: [db.Users]
        }).then(function(dbItem) {
        res.json(dbItem);
        });

    }

  });

  // POST route for saving a new post
  app.post("/api/items", function(req, res) {

    if (!req.user) {
        // The user is not logged in, send back an empty object
        res.json({});

      } else {

        db.masterFoods.create({
            foodName: req.body.foodName,
            days: req.body.days,
            UserId: req.user.id
        }).then(function(dbItem) {
            res.json(dbItem);
            });
        }

  });

  // DELETE route for deleting items
  app.delete("/api/items/:id", function(req, res) {

    if (!req.user) {
        // The user is not logged in, send back an empty object
        res.json({});
      } else {

        db.masterFoods.destroy({
            where: {
                id: req.params.id
            }
            }).then(function(dbItem) {
            res.json(dbItem);
            });
    }
  });

  // PUT route for updating items
  app.put("/api/items", function(req, res) {

    if (!req.user) {
        // The user is not logged in, send back an empty object
        res.json({});
      } else {

        db.masterFoods.update(
            req.body,
            {
            where: {
                id: req.body.id
            }
            }).then(function(dbItem) {
            res.json(dbItem);
        });
    }
 });

};