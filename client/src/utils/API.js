import axios from "axios";

const key = "396259ee2c624ff1bde837f53cf92a76";


export default {

  runQuery: function() {
    // console.log(topic);

    const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + key + "&q=bitcoin";
    // + "&q=" + topic;

    axios.get(queryURL).then(function(responseObj) {
      console.log("apiObj", responseObj.data.response.docs);
      // return(responseObj.data.response.docs)
    });

  },

  // Gets all articles
  getArticles: function() {
    return axios.get("/api/articles");
  },
  // Gets the article with the given id
  getArticle: function(id) {
    return axios.get("/api/articles/" + id);
  },
  // Deletes the book with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a book to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  }
};

