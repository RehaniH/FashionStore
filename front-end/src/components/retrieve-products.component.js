import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from 'axios'

const Product = props =>(
   <tr>
       <td>{props.product.name}</td>
       <td>{props.product.description}</td>
       <td>{props.product.price}</td>
       <td>{props.product.total_quantity}</td>
       <td>{props.product.category.name}</td>
       <td>
           <Link to={"/" + props.product._id}>Edit</Link>
       </td>
   </tr>
)
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
                console.log('error');
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
                <table className="table table-dark">
                    <thead>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
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