import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import Rating from '@material-ui/lab/Rating';
import { sizing } from '@material-ui/system';
import Box from '@material-ui/core/Box';
import Moment from 'react-moment';
import 'moment-timezone';
import { FiEdit3 } from 'react-icons/fi';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";





const CommentSingle = (props) => {
    const  comment  = props.comment;
    const user = props.user;


    return(

   <div className="container">
      <div className="row">
        <div class="col-sm-9">

              <li className="media">
              <a className="pull-left" href="#">
                <img className="media-object " src="https://img.icons8.com/dusk/64/000000/user-male-circle--v1.png" alt="profile" />
                
              </a>
              <div className="media-body">
                <div className="well well-lg">
                <div className="media-date text-uppercase reviews list-inline text-right">
                    <li className="dd"><Moment format="D MMM YYYY" withTitle>{comment.date_of}</Moment></li>
                   

                  </div>
              <h3 className="media-heading text-uppercase reviews">
              

              { comment.username }
              
              </h3>
                 <br></br>
                  
                  <Box component="fieldset" mb={2} borderColor="transparent" >
        
                    <Rating  size="large" name="read-only" value={comment.ratings} readOnly />
                </Box>
                  
                
                  <h4 className="media-comment">
                  {comment.comment}
                  </h4>
                  <div className={"text-right "+(comment.username == user ? 'show' : 'hidden')}>
                    
                  <Link to={`/edit-comment/${comment._id}`}>
                  <FiEdit3 size="2em"></FiEdit3>
                  </Link>
                  
                  </div>  
                </div>
                            
              </div>

            </li>   
        </div>
  </div>   
  </div>





    )
};

CommentSingle.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(CommentSingle);









