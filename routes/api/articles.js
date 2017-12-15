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
  .get(articlesController.findById)
  .put(articlesController.update)
  .delete(articlesController.remove);

module.exports = router;


const axios = require("axios");
const router = require("express").Router();

router.get("/recipes", (req, res) => {
  axios
    .get("http://www.recipepuppy.com/api/", { params: req.query })
    .then(({ data: { results } }) => res.json(results))
    .catch(err => res.status(422).json(err));
});

module.exports = router;