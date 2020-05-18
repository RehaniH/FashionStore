import React, {Component} from "react";
import axios from 'axios';

class AddDiscountComponent extends Component{

    constructor(props) {
        super(props);

        this.state ={
            product_id:'',
            product_ref:0,
            product_name:'',
            description:'',
            retail_price:0.00,
            manufactured_price:0.00,
            discount_percentage: 0,
            discounted_price:0.00,
            category:'',
            start_date: '',
            end_date: '',
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/products/ref-no/'+ this.props.match.params.id)
            .then(response =>{
                console.log(response);
                console.log(response.data.product_image);
                this.setState({
                    product_id: response.data.product_id,
                    product_ref: response.data.ref_no,
                    manufactured_price: response.data.manufacturer_price,
                    retail_price: response.data.retail_price,
                    description: response.data.description,
                    product_name: response.data.name,
                    category: response.data.category
                })
            })
            .catch();
    }

    render() {
        return (
            <div>
                <p>Replace here with the AddDiscountComponent</p>
                <div>
                    <label>Product No: </label>{this.state.ref_no}
                    <label>Product Name: </label>{this.state.product_name}
                    <label>Description: </label> {this.state.description}
                    <label>Quantity: </label> {this.state.quantity}
                    <label>Manufactured Price: </label>{this.state.manufacturer_price}
                    <label>Retail Price: </label>{this.state.retail_price}
                </div>

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Retail Price: </label>
                        <input type="number" className="form-control" onChange={this.onChangeRetailPrice}
                               value={this.state.retail_price}/>
                    </div>


                    <div className="form-group">
                        <input type="submit" className="btn btn-primary" value="Add Product"/>
                    </div>

                </form>
            </div>
        );
    }
}

export default AddDiscountComponent;