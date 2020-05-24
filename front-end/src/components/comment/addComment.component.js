import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import Modal from 'react-awesome-modal';
import { Redirect } from 'react-router-dom';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";






class AddComment extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            email:'',
            ratings:'',
            comment:'',
            date_of:'',
            product_id:'',
            visible : false
            
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
            product_id: this.props.product
            
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
                
                this.props.history.push('/home/'+this.props.product);
                // this.props.updateState();
            }) 
            .catch(err => {
                console.log("Error in AddComment!");
            })
    };

        openModal() {
          this.setState({
              visible : true
          });
      }

      closeModal() {
          this.setState({
              visible : false
          });
          window.location.reload(false);
      }

    

    

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
                isRequired
              />
            </Box>
            
          </div>
        );
        }

        const { user } = this.props.auth;

        if(this.props.auth.user.role === 'user') {

        return (


<section>

<div className="container">
  <div className={(user.name == undefined ? "hidden" : "row")}>
<AwesomeButton size={"large"} type="primary" onPress={() => this.openModal()} >
Rate this product
  </AwesomeButton>
  </div>
  </div>
<Modal visible={this.state.visible} width="500" height="350" effect="fadeInUp" onClickAway={() => this.closeModal()}>
    <div>
      <center><h1>Add New Comment</h1></center>
        <div className="m-2">
                      <br></br>
                        <form onSubmit={this.onSubmit} className="form-horizontal" > 
                          <div className="form-group">
                            <label htmlFor="email" className="col-sm-4 control-label ">UserName:</label>
                            <div className="col-sm-7">
                            <input

                                        type='text'
                                        placeholder='username'
                                        name='username'
                                        className='form-control'
                                        value={user.name}
                                        onChange={this.onChange}
                                        readOnly
                                        
                            />
                            </div>
                          </div>
{/* 
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
                          </div> */}

                          

                          <div className="form-group">
                            <label htmlFor="uploadMedia" className="col-sm-4 control-label">Rating:</label>
                            <div className="col-sm-7">                    
                              <div className="input-group">
                                
                            
                             
                              <SimpleRating/>
                    
                             

                              </div>
                            </div>
                          </div>

                          <div className="form-group">
                            <label htmlFor="uploadMedia" className="col-sm-4 control-label">Comment:</label>
                            <div className="col-sm-7">                    
                              <div className="input-group">
                                <textarea
                                        type='text'
                                        placeholder='Add Comment'
                                        name='comment'
                                        className='form-control'
                                        value={this.state.comment}
                                        onChange={this.onChange}
                                        required
                                    />
                              
                              </div>
                            </div>
                          </div>

          
                          <div className="form-group">
                            <div className="col-sm-offset-4 col-sm-10">                    
                              <button className="btn btn-success btn-circle text-uppercase" type="submit" id="submitComment" onClick={() => this.closeModal()}><span className="glyphicon glyphicon-send" /> Post</button>
                            </div>
                          </div>            
                        </form>
                      </div>

      
      
       
        {/* <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a> */}
    </div>
</Modal>
</section>


        );
      } else {
        return <Redirect to='/login' />
    }
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


 