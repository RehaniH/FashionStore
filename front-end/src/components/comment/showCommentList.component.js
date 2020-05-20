import React, { Component } from 'react';
import '../../App.css';
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
      .get('http://localhost:4000/ratings/get/12')
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


      <div>
          
      <link href="//netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
      <script src="//netdna.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
      <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>

      <div className="container">
      <div class="row">
      <div class="col-sm-10 col-sm-offset-1">         

      <div className="comment-tabs">
          <ul className="nav nav-tabs" role="tablist">
            <li className="active"><a href="#comments-logout" role="tab" data-toggle="tab"><h4 className="reviews text-capitalize">Comments</h4></a></li>
            <li >
            <a href="" role="tab" data-toggle="tab">
              
            <h4 className="reviews text-capitalize">
            <Link to={`/add-comment`}>
            Add Comment
            </Link>
              
              </h4></a></li>
          </ul>
              
             
              <div className="card col-sm-12">
                <div className="card-body">

                  <div className="list">
                    <ul className="media-list">
                              {commentList}
                    </ul>
                  </div>
                  </div>
              </div>
             
             
              
                        
        </div>

        
        

    </div>
</div>
</div>
</div>



 
    );
  }
}

export default ShowCommentList;
