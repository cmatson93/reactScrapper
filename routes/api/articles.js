const router = require("express").Router();
const axios = require("axios");
const articlesController = require("../../controllers/articlesController");

// Matches with "/api/books"
router.route("/")
  .get(articlesController.findAll)
  .post(articlesController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .post(articlesController.create)
  .get(articlesController.findById)
  .put(articlesController.update)
  .delete(articlesController.remove);

module.exports = router;


