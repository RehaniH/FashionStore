import React, {Component} from "react";
import {Link} from "react-router-dom";
import { Redirect } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import StoreMangerSideBar from './layout/store-manger-side-bar'
import Navbar from "../admin/layout/Navbar";
import Footer from "../admin/layout/Footer";
import Logout from "../admin/layout/Logout-Modal";
import { FaUsers, FaUserSecret, FaTags } from 'react-icons/fa';
import axios from 'axios';

const Product = props =>(
   <tr>
       <td>{props.product.ref_no}</td>
       <td>{props.product.name}</td>
       <td >{props.product.retail_price.toFixed(2)}</td>
       <td>{props.product.total_quantity}</td>
       <td>{props.product.category !== undefined ? props.product.category.name: ''}</td>
       <td><img src={props.product.product_image} height='80' width='60' alt={props.product.name}/></td>
       <td>
           <Link className='btn btn-info'  to={"/storage/edit-products/" + props.product._id}>Edit</Link>
           <Link className='btn btn-danger ml-3' to={"/storage/discounts/" + props.product._id}> {props.product.discount !== undefined ? 'Edit Discount':'Add Discount'}</Link>
       </td>
   </tr>
);
class AllProducts extends Component{

    constructor(props) {
        super(props);
        this.state ={
            products:[],
            users: '',
            manager: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/products/all')
            .then(response=>{
                this.setState({
                    products: response.data});
            }).catch(function (err) {
                console.log('error : ' + err.getMessage);
        });

        axios.get('http://localhost:4000/api/users/allUsers')
            .then(response => {
                this.setState({ users: response.data.length });
            })
            .catch(function (error){
                console.log(error);
            });

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        axios.get('http://localhost:4000/products/all')
            .then(response=>{
                this.setState({
                    products: response.data});
            }).catch(function (err) {
            console.log('error : ' + err.getMessage);
        })
    }

    displayProducts() {
        return this.state.products.map(function (currentProduct, i) {
            return <Product product={currentProduct} key={i}/>;
        })
    }
    render() {
        const { user } = this.props.auth;
        if(this.props.auth.user.role === 'manager') {
        return (
            <div>
                <div>
                    <div id="wrapper">
                        <StoreMangerSideBar/>
                        <div id="content-wrapper" className="d-flex flex-column">
                            <div id="content">
                                <Navbar/>
                                <div className="container-fluid">
                                    <div>
                                    <div>
                                        <Link to='/storage/products'><button className='btn btn-success mb-3'>Add New Product</button></Link>
                                    </div>

                                        <div className="card shadow mb-4">
                                            <div className="card-header py-3">
                                                <h6 className="m-0 font-weight-bold text-primary">Products</h6>
                                            </div>
                                            <div className="card-body">
                                                <table className="table" id="dataTable" width="100%" cellSpacing="0">
                                                    <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Name</th>
                                                        <th>Price</th>
                                                        <th>Quantity</th>
                                                        <th>Category</th>
                                                        <th>Image</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {this.displayProducts()}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Footer/>
                        </div>
                    </div>
                    <a className="scroll-to-top rounded" href="#page-top">
                        <i className="fas fa-angle-up" />
                    </a>
                    <Logout/>
                </div>
            </div>

        );
        } else {
            return <Redirect to='/login' />
        }
    }


}

AllProducts.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(AllProducts);