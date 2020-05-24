import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import axios from 'axios';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import { RiHeartAddLine } from 'react-icons/ri';
import { confirmAlert } from 'react-confirm-alert';


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
            price: this.props.product.retail_price,
            makeunique: user.name + this.props.product.name,
            ref_no: this.props.product.ref_no
            
        };
        console.log(data);

        axios
            .post('http://localhost:4000/wishlists/add/', data)
            .then(res => {
                this.setState({
                    username: '',
                    productname:'',
                    productimage:'',
                    price:'',
                    makeunique:'',
                    ref_no:''
                    
                })
                this.props.history.push('/');
            })
            .catch(err => {
                
                console.log("Error in AddWishlist!");
            })
    };

    
    alertaddwishlist = () => {
        confirmAlert({
          
          title: 'My Wishlist ',
          message: 'Item has been added to your wishlist',
          buttons: [
            {
              label: 'ok',
      
            }
           
          ]
        });
      };

    render() {
      const { user } = this.props.auth;
        return (


                        
                        <form style={{display: user.name === undefined ? 'none' : 'block'}} noValidate onSubmit={this.onSubmit}>


                         
                        <button className="btn btn-outline-danger" type="submit" onClick={this.alertaddwishlist.bind(this)} >
                        
                        <RiHeartAddLine ></RiHeartAddLine>
                       
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