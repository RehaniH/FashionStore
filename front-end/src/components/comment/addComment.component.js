import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";



class AddComment extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            email:'',
            ratings:'',
            comment:'',
            date_of:'',
            product_id:''
            
        };
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

 
    
    onSubmit = e => {
        e.preventDefault();
        
        const { user } = this.props.auth;

        const data = {
          
            username: user.name,
            email: this.state.email,
            ratings: this.state.ratings,
            comment: this.state.comment,
            date_of: new Date,
            product_id: "23"
            
        };

        axios
            .post('http://localhost:4000/ratings/add', data)
            .then(res => {
                this.setState({
                    username: '',
                    email:'',
                    ratings:'',
                    comment:'',
                    date_of:'',
                    product_id:'',
                    value:''
                    
                })
                this.props.history.push('/comments');
            })
            .catch(err => {
                console.log("Error in AddComment!");
            })
    };

    

    

    render() {

      const SimpleRating = () =>{
        const [value, setValue] = React.useState();
  
        return (
          <div>
            <Box component="fieldset" mb={3} borderColor="transparent">
             
              <Rating
                name="ratings"
                value={this.state.ratings}
                onChange={this.onChange}
                size="large"
              />
            </Box>
            
          </div>
        );
        }

        const { user } = this.props.auth;

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
            <li ><a href="" role="tab" data-toggle="tab"><h4 className="reviews text-capitalize">
              
            <Link to={`/comments`}>
            Comments
            </Link>
              
              </h4></a></li>
            <li className="active" ><a href="#add-comment" role="tab" data-toggle="tab"><h4 className="reviews text-capitalize">Add comment</h4></a></li>
          </ul>
              
             
          <div className="tab-pane" id="add-comment-disabled">
                      <br></br>
                        <form onSubmit={this.onSubmit} className="form-horizontal" > 
                          <div className="form-group">
                            <label htmlFor="email" className="col-sm-2 control-label">UserName:</label>
                            <div className="col-sm-10">
                            <input

                                        type='text'
                                        placeholder='username'
                                        name='username'
                                        className='form-control'
                                        value={user.name}
                                        onChange={this.onChange}
                                        
                            />
                            </div>
                          </div>

                          <div className="form-group">
                           
                            <div className="col-sm-10">                    
                              <div className="input-group">
                                
                              <input
                                        type='hidden'
                                        placeholder='email'
                                        name='email'
                                        className='form-control'
                                        value={this.state.email}
                                        onChange={this.onChange}
                                    />
                              </div>
                            </div>
                          </div>

                          

                          <div className="form-group">
                            <label htmlFor="uploadMedia" className="col-sm-2 control-label">Rating:</label>
                            <div className="col-sm-10">                    
                              <div className="input-group">
                                
                            
                             
                              <SimpleRating/>
                    
                             

                              </div>
                            </div>
                          </div>

                          <div className="form-group">
                            <label htmlFor="uploadMedia" className="col-sm-2 control-label">Comment:</label>
                            <div className="col-sm-10">                    
                              <div className="input-group">
                                <textarea
                                        type='text'
                                        placeholder='Add Comment'
                                        name='comment'
                                        className='form-control'
                                        value={this.state.comment}
                                        onChange={this.onChange}
                                    />
                              
                              </div>
                            </div>
                          </div>

          
                          <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">                    
                              <button className="btn btn-success btn-circle text-uppercase" type="submit" id="submitComment"><span className="glyphicon glyphicon-send" /> Post</button>
                            </div>
                          </div>            
                        </form>
                      </div>
             
             
              
                        
        </div>

        
        

    </div>
</div>
</div>
</div>


        );
    }
}

AddComment.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(AddComment);


 