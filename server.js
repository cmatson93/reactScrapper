const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
app.use(routes);

// Set up promises with mongoose
mongoose.Promise = global.Promise;
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/nytArticles_db";
// Connect to the Mongo DB
if (process.env.MONGODB_URI) {
	mongoose.connect(MONGODB_URI, {
		useMongoClient: true
	})
}
else {
	mongoose.connect("mongodb://localhost/nytArticles_db");
};



// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
