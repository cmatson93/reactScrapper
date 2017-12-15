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
    // const key = "396259ee2c624ff1bde837f53cf92a76";

    // const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + key + "&q=bitcoin";
    // // + "&q=" + topic;

    // axios.get(queryURL).then((responseObj) =>{
    //   console.log("apiObj", responseObj.data.response.docs);
    //   // return(responseObj.data.response.docs)
    //   console.log(this.state);
    //   this.setState({
    //       articles: responseObj.data.response.docs
    //   }); 

    //   console.log(this.state)
    // });


    API.getArticles()
      .then(res =>
        this.setState({ articles: res.data, title: "", href: "" })
      )
      .catch(err => console.log(err));
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
    if (this.state.topic) {
      API.runQuery(this.state.topic)
        // .then(res => console.log(res.data.response.docs),
        //   this.setState({articles: res.data.response.docs})
        //   ) 
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
