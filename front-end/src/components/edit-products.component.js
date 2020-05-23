import React, {Component} from "react";
import axios from 'axios';

class editProductsComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            product_name:"",
            category:"",
            quantity: 0,
            manufacturer_price: 0.00,
            retail_price: 0.00,
            description:"",
            product_img:null,
            categories:[]
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/products/ref-no/' + this.props.match.params.id)
            .then(response=>{
                this.setState({
                    product_name:response.data.name,
                    category:response.data.category._id,
                    quantity: response.data.quantity,
                    manufacturer_price: response.data.manufacturer_price,
                    retail_price: response.data.retail_price,
                    description:response.data.description,
                    product_img:response.data.product_image
                })
            })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Product No: </label>
                        <input type="text" className="form-control" onChange={this.onChangeRefNo}
                               value={this.state.ref_no}/>
                    </div>

                    <div className="form-group">
                        <label>Product Name: </label>
                        <input type="text" className="form-control" onChange={this.onChangeProductName}
                               value={this.state.product_name}/>
                    </div>

                    <div className="form-group">
                        <label>Description: </label>
                        <textarea className="form-control" onChange={this.onChangeDescription}
                               value={this.state.description}/>
                    </div>

                    <div className="form-group">
                        <label>Quantity: </label>
                        <input type="number" className="form-control" onChange={this.onChangeQuantity}
                               value={this.state.quantity}/>
                    </div>

                    <div className="form-group">
                        <label>Manufactured Price: </label>
                        <input type="number" className="form-control" onChange={this.onChangeManufacturerPrice}
                               value={this.state.manufacturer_price}/>
                    </div>
                    <div className="form-group">
                        <label>Retail Price: </label>
                        <input type="number" className="form-control" onChange={this.onChangeRetailPrice}
                               value={this.state.retail_price}/>
                    </div>

                    <div className="form-group">
                        <label>Category: </label>
                        <select className="form-control" value={this.state.category} onChange={this.onChangeCategory}>
                            {this.state.categories.map(category => <option key={category._id} value={category._id}>{category.name}</option>)}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Product Image: </label>
                        <input type="file" className="form-control" onChange={this.onChangeFile} name="someFile"/>
                    </div>

                    <div className="form-group">
                        <input type="submit" className="btn btn-primary" value="Add Product"/>
                    </div>

                </form>
            </div>
        );
    }
}

export default editProductsComponent;