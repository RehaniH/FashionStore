import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { FaSave } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import Modal from 'react-awesome-modal';



class UpdateComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      ratings: '',
      comment: '',
      date_of: '',
      product_id:'',
      visible:true
      
    };
  }

  componentDidMount() {
    
    
    axios
      .get('http://localhost:4000/ratings/'+this.props.match.params.id)
      .then(res => {
        // this.setState({...this.state, book: res.data})
        this.setState({
          username: res.data.username,
          email: res.data.email,
          ratings: res.data.ratings,
          comment: res.data.comment,
          date_of: res.data.date_of,
          product_id: res.data.product_id
          
          
        })
      })
      .catch(err => {
        console.log("Error from Update Comment");
      })
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      username: this.state.username,
      email: this.state.email,
      ratings: this.state.ratings,
      comment: this.state.comment,
      date_of: new Date(),
     
    };

    axios
      .put('http://localhost:4000/ratings/'+this.props.match.params.id, data)
      .then(res => {
        this.props.history.push('/home/'+this.state.product_id);
      })
      .catch(err => {
        console.log("Error in Update Comment!");
      })
  };


  confirm = (id) => {
    confirmAlert({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this comment?',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>{
          axios
          .delete('http://localhost:4000/ratings/'+id)
          .then(res => {
            this.props.history.push("/home/"+this.state.product_id);
          })
          .catch(err => {
            console.log("Error form Show Comment Details_deleteClick");
          })
        }
        },
        {
          label: 'No',
          onClick: () => {this.props.history.push("/home/"+this.state.product_id);}
        }
      ]
    });
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
        this.props.history.push("/home/"+this.state.product_id);
        

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
            />
          </Box>
          
        </div>
      );
      }

    return (


<section>

<Modal visible={this.state.visible} width="500" height="500"  effect="fadeInUp" onClickAway={() => this.closeModal()}>
    <div>
    <center><h1>Edit Your Comment</h1></center>
    <div className="m-5 mt-2">
    <form  onSubmit={this.onSubmit} className="form-horizontal" > 
                          <div className="form-group">
                            <label htmlFor="email" className="col-sm-4 control-label">UserName:</label>
                            <div className="col-sm-12">
                            <input
                                        type='text'
                                        placeholder='username'
                                        name='username'
                                        className='form-control'
                                        value={this.state.username}
                                        onChange={this.onChange}
                                        readOnly
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
                            <label htmlFor="uploadMedia" className="col-sm-4 control-label">Rating:</label>
                            <div className="col-sm-10">                    
                              <div className="input-group">
                                
                            
                             
                              <SimpleRating/>
                    
                             

                              </div>
                            </div>
                          </div>

                          <div className="form-group">
                            <label htmlFor="uploadMedia" className="col-sm-4 control-label">Comment:</label>
                            <div className="col-sm-12">                    
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
                              <button className="btn btn-warning btn-circle text-uppercase m-2" type="submit" id="submitComment"><FaSave/> Save Changes</button>
                              <a className="btn btn-danger btn-circle text-uppercase" type="submit"  onClick={() => {this.closeModal();this.confirm(this.props.match.params.id);}} ><MdDelete/></a>
                            </div>
                          </div>           
                        </form>

                        </div>
      
    </div>
</Modal>
</section>



    );
  }
}

export default UpdateComment;
