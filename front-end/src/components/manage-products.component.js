import React, {Component} from "react";
import axios from 'axios';

class AddProducts extends Component{

    constructor(props) {
        super(props);

        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeDesciption = this.onChangeDesciption.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            product_name:"",
            category:"",
            quantity: 0,
            price: 0.00,
            description:""

        }
    }

    onChangeProductName(e){
        this.setState({
            product_name: e.target.value
        });
    }
    onChangeQuantity(e){
        this.setState({
            quantity: e.target.value
        });
    }
    onChangePrice(e){
        this.setState({
            price: e.target.value
        });
    }

    onChangeDesciption(e){
        this.setState({
            description: e.target.value
        });
    }

    onChangeCategory(e){
        this.setState({
            category: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        console.log(`Form submitted`);
        console.log(`Name : ${this.state.product_name}`);
        console.log(`Description : ${this.state.description}`);
        console.log(`category: ${this.state.category}`);
        console.log(`price: ${this.state.price}`);
        console.log(`quantity: ${this.state.quantity}`);

        const newProduct = {
            name: this.state.product_name,
            description: this.state.description,
            category: this.state.category,
            total_quantity: this.state.quantity,
            price: this.state.price
        };
        axios.post('http://localhost:4000/products/create', newProduct)
            .then(res => console.log(res.data));
        this.setState({
            product_name:'',
            description:'',
            category:'',
            price: 0.00,
            quantity: 0
        });

    }
    render() {
        return (
            <div>
                <div style={{marginTop: 20}}>
                    <h3>Add New Product</h3>
                    <form onSubmit={this.onSubmit}>

                        <div className="form-group">
                            <label>Product Name: </label>
                            <input type="text" className="form-control" onChange={this.onChangeProductName}
                                   value={this.state.product_name}/>
                        </div>

                        <div className="form-group">
                            <label>Description: </label>
                            <input type="text" className="form-control" onChange={this.onChangeDesciption}
                                   value={this.state.description}/>
                        </div>

                        <div className="form-group">
                            <label>Quantity: </label>
                            <input type="number" className="form-control" onChange={this.onChangeQuantity}
                                   value={this.state.quantity}/>
                        </div>

                        <div className="form-group">
                            <label>Price: </label>
                            <input type="number" className="form-control" onChange={this.onChangePrice}
                                   value={this.state.price}/>
                        </div>

                        <div className="form-group">
                            <label>Category: </label>
                            <input type="text" className="form-control" onChange={this.onChangeCategory}
                                   value={this.state.category}/>
                        </div>

                        <div className="form-group">
                            <input type="submit" className="btn btn-primary" value="Add Product"/>
                        </div>

                    </form>
                </div>
            </div>
        );
    }

}

export default AddProducts;