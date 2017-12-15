import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import axios from "axios";

class Ariticles extends Component {
  state = {
    articles: [],
    topic: ""
  }

  componentDidMount() {
    this.loadArticles();
  }


  loadArticles = () => {
    // console.log(topic);
    const key = "396259ee2c624ff1bde837f53cf92a76";

    const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + key + "&q=bitcoin";
    // + "&q=" + topic;

    axios.get(queryURL).then((responseObj) =>{
      console.log("apiObj", responseObj.data.response.docs);
      // return(responseObj.data.response.docs)
      console.log(this.state);
      this.setState({
          articles: responseObj.data.response.docs
      }); 

      console.log(this.state)
    });


    // API.getArticles()
    //   .then(res =>
    //     this.setState({ articles: res.data, title: "", href: "" })
    //   )
    //   .catch(err => console.log(err));
  }

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.href) {
      API.runQuery({
        title: this.state.title,
        href: this.state.href
      })
        .then(res => this.loadArticles())
        .catch(err => console.log(err));
    }
  }

  setTopic = (topic) => {
    this.setState{
      topic: topic
    })
    .then(this.getNewArticles())
  }

  getNewArticles = () => {
    API.runQuery(this.state.topic)
      .then(res =>
        console.log(res)
      )
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-8 sm-12">
            <Jumbotron>
              <h1>BI Scrapper</h1>
              <h3>Web Application that allows you to scrape Buisiness Insiders Website</h3>
            </Jumbotron>
            {! this.state.articles.length ?  (
              <h3>No Results to Display</h3>
            ) : (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <Link to={"/articles/" + article._id}>
                      <strong>
                        {article.snippet}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                  </ListItem>
                ))}
              </List>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Ariticles;
