import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CommentSingle from "./commentSingle.component.js";

class ShowCommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:4000/ratings/')
      .then(res => {
        this.setState({
          comments: res.data
        })
      })
      .catch(err =>{
        console.log('Error from ShowCommentList');
      })
  };


  render() {
    const comments = this.state.comments;
    console.log("Print Comments: " + comments);
    let commentList;

    if(!comments) {
      commentList = "there is no comments";
    } else {
      commentList = comments.map((comment, k) =>
        <CommentSingle comment={comment} key={k} />
      );
    }

    return (
      <div className="ShowCommentList">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">comments List</h2>
            </div>

            <div className="col-md-11">
              <Link to="/comments/add-comment" className="btn btn-outline-warning float-right">
                + Add New comment
              </Link>
              <br />
              <br />
              <hr />
            </div>

          </div>

          <div className="list">
                {commentList}
          </div>
        </div>
      </div>
    );
  }
}

export default ShowCommentList;