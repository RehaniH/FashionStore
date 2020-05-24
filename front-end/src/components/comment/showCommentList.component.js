import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CommentSingle from "./commentSingle.component.js";
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";

import Rating from 'react-rating';




class ShowCommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      averageratings:''
      
    };
  }

  

  componentDidMount() {
    console.log("this is ref no"+this.props.product);
    axios
      .get('http://localhost:4000/ratings/get/'+this.props.product)
      .then(res => {
        this.setState({
          comments: res.data
        })
      })
      .catch(err =>{
        console.log('Error from ShowCommentList');
      })

      axios
      .get('http://localhost:4000/ratings/count/'+this.props.product)
      .then(res => {
        this.setState({
          averageratings: res.data
        })
      })
      .catch(err =>{
        console.log('Error from ShowCommentList');
      })
  };


  render() {
    const avg= Math.round( this.state.averageratings * 100) / 100;
    const { user } = this.props.auth;
    const comments = this.state.comments;
   
    console.log("Print Comments: " + comments);
    let commentList;

    if(!comments) {
      commentList = "there is no comments";
    } else {
      commentList = comments.map((comment, k) =>
        
        <CommentSingle comment={comment} key={k} user={user.name} />
      );
    }

    if(this.props.auth.user.role === 'user') {
    return (


      <div>
       
          
      <link href="//netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
      <script src="//netdna.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
      <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>

      <div className="container">
    
      <div class="row">
      <div class="col-sm-10 col-sm-offset-1"> 
      <h1>Customer Reviews</h1> 
      <div className="row">
        
        
      <div className="col-sm-10">
      <Rating placeholderRating={avg} readonly
      
      />
      {/* <StarsRating
        count={5}
        size={74}
        value={avg}
        color={'gold'} 
        isSelectable={'false'}
      />   */}
      </div>
        <div className="col-sm-2">  
        <h1 className="text-left">{avg}/5</h1>
        </div>
      </div> 
      <div className="comment-tabs">
          <ul className="nav nav-tabs" role="tablist">
            <li className="active"><a href="#comments-logout" role="tab" data-toggle="tab"><h4 className="reviews text-capitalize">Comments</h4></a></li>
           
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
    } else {
      return <Redirect to='/login' />
    }
  }
}

ShowCommentList.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(ShowCommentList);
