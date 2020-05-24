import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from 'axios'

const Product = props =>(
   <tr>
       <td>{props.product.ref_no}</td>
       <td>{props.product.name}</td>
       <td>{props.product.description}</td>
       <td>{props.product.retail_price}</td>
       <td>{props.product.total_quantity}</td>
       <td>{props.product.category !== undefined ? props.product.category.name: ''}</td>
       <td><img src={props.product.product_image} height='40' width='30' alt={props.product.name}/></td>
       <td>
           <Link to={"/storage/edit/" + props.product._id}>Edit</Link>
           <Link to={"/storage/discounts/" + props.product._id}>Add Discount</Link>
       </td>
   </tr>
);
class AllProducts extends Component{

    constructor(props) {
        super(props);
        this.state ={
            products:[]
        }
    }

    componentDidMount() {
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
        return (
            <div>
                <div>
                    <Link to='/storage/products'><button className='btn btn-circle btn-danger'>Add New Product</button></Link>
                </div>
                <table className="table table-dark">
                    <thead>
                        <th>Product Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                        <th>Product Image</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                    {this.displayProducts()}
                    </tbody>
                </table>
            </div>
        );
    }


}

export default AllProducts;