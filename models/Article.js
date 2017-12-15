const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;


const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  href: {
    type: String,
    required: true
  },
  saved: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;





