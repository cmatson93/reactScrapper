import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import SaveBtn from "../../components/SaveBtn";
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
    topic: "",
    save: false
  }

  componentDidMount() {
    this.loadArticles();
  }


  loadArticles = () => {

    API.getArticles()
      .then(res =>
        this.setState({ articles: res.data})
      )
      .catch(err => console.log(err));
  }

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  }

  saveArticle = id => {
    API.saveArticle(id)
    // API.saveBook({
    //   title: this.state.title,
    //   author: this.state.author,
    //   synopsis: this.state.synopsis
    // })
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
      // .then(res => this.loadArticles())
      // .catch(err => console.log(err));
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }


  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.topic) {
      API.runQuery(this.state.topic)

        .then(res => this.setState({articles: res.data.response.docs}))
        .catch(err => console.log(err));
        // .catch(err => console.log(err));
        // console.log(this.state);
    }
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12 sm-12">
            <Jumbotron>
              <h1>New York Times Article Search</h1>
              <h3>Web Application that allows you to search the New York Times for articles on a specific topic</h3>
            </Jumbotron>
            <Row>
              <Col size="md-8 sm-12">
              <Input
                name="topic"
                value={this.state.topic}
                onChange={this.handleInputChange}
                placeholder="Search a topic"
              />
              </Col>   
              <Col size="md-2 sm-12">
                <FormBtn
                  onClick={this.handleFormSubmit}
                  type="success"
                  className="input-lg"
                >
                  Search
                </FormBtn>
              </Col>
            </Row>
            {! this.state.articles.length ?  (
              <h3>No Results to Display</h3>
            ) : (
              <List>
                {this.state.articles.map(article => (
                  console.log(article),
                  <ListItem 
                    key={article._id}
                    href={article.web_url}
                  >
                    <Link to={"/articles/" + article._id}>
                      <strong>
                        {article.snippet}
                      </strong>
                    </Link>
                    {! this.state.saved ? (
                      <SaveBtn onClick={() => this.saveArticle(article._id, article.snippet, article.href)} />
                    ) : (
                      <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                    )}
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
