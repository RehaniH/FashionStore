import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import axios from 'axios';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import { RiHeartAddLine } from 'react-icons/ri';


class AddWishlist extends Component {

    

    // onChange = e => {
    //     this.setState({ [e.target.name]: e.target.value });
    // };

    onSubmit = e => {
        e.preventDefault();
        const { user } = this.props.auth;

        const data = {
            username: user.name,
            productname: this.props.product.name,
            productimage: this.props.product.product_image,
            price: this.props.product.retail_price
            
        };
        console.log(data);

        axios
            .post('http://localhost:4000/wishlists/add/', data)
            .then(res => {
                this.setState({
                    username: '',
                    productname:'',
                    productimage:'',
                    price:''
                    
                })
                this.props.history.push('/');
            })
            .catch(err => {
                
                console.log("Error in AddWishlist!");
            })
    };

    render() {
        return (
            // <div className="AddWishlist">
            //     <div className="container">
            //         <div className="row">
            //             <div className="col-md-8 m-auto">
            //                 <br />
            //                 <Link to="/comments" className="btn btn-outline-warning float-left">
            //                     Show Comment List
            //                 </Link>
            //             </div>
            //             <div className="col-md-8 m-auto">
            //                 <h1 className="display-4 text-center">Add new wishlist</h1>
            //                 <p className="lead text-center">
                                
            //                 </p>

            //                 <form noValidate onSubmit={this.onSubmit}>
            //                     <div className='form-group'>
            //                         <input
            //                             type='text'
            //                             placeholder='username'
            //                             name='username'
            //                             className='form-control'
            //                             value={this.state.username}
            //                             onChange={this.onChange}
            //                         />
            //                     </div>
            //                     <br />

            //                     <div className='form-group'>
            //                         <input
            //                             type='productname'
            //                             placeholder='productname'
            //                             name='productname'
            //                             className='form-control'
            //                             value={this.state.productname}
            //                             onChange={this.onChange}
            //                         />
            //                     </div>

            //                     <div className='form-group'>
            //                         <input
            //                             type='number'
            //                             placeholder='price'
            //                             name='price'
            //                             className='form-control'
            //                             value={this.state.price}
            //                             onChange={this.onChange}
            //                         />
            //                     </div>

                               
                          
            //                     <input
            //                         type="submit"
            //                         className="btn btn-outline-warning btn-block mt-4"
            //                     />
            //                 </form>
            //             </div>
            //         </div>
            //     </div>
            // </div>


                        <form noValidate onSubmit={this.onSubmit}>


                           
                        <button className="btn btn-outline-danger" type="submit" >
                        <RiHeartAddLine></RiHeartAddLine>
                        </button>
                        
                        </form>

            
        );
    }
}

AddWishlist.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps
  )(AddWishlist);