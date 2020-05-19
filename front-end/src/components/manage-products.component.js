import React, {Component} from "react";
import axios from 'axios';

class AddProducts extends Component{

    constructor(props) {
        super(props);
        this.onChangeRefNo = this.onChangeRefNo.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeRetailPrice = this.onChangeRetailPrice.bind(this);
        this.onChangeManufacturerPrice = this.onChangeManufacturerPrice.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            ref_no: 0,
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
        axios.get('http://localhost:4000/products/category/all')
            .then(response =>{
            this.setState({
                categories: response.data
            });
            console.log(response.data);
        }).catch(err => console.log('error'))
    }

    onChangeRefNo(e){
        this.setState({
            ref_no: e.target.value
        });
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
    onChangeManufacturerPrice(e){
        this.setState({
            manufacturer_price: e.target.value
        });
    }

    onChangeRetailPrice(e){
        this.setState({
            retail_price: e.target.value
        });
    }
    onChangeDescription(e){
        this.setState({
            description: e.target.value
        });
    }

    onChangeCategory(e){
        console.log(e.target.value + ' in main');
        this.setState({
            category: e.target.value
        });

        console.log('State: ' + this.state.category);
    }

    onChangeFile(e){
        console.log(e.target.files[0]);
        this.setState({
            product_img: e.target.files[0],
            loaded:0,
        });
    }

    onSubmit(e){
        e.preventDefault();

        console.log(`Form submitted`);
        console.log(`Name : ${this.state.product_name}`);
        console.log(`ref_no : ${this.state.ref_no}`);
        console.log(`Description : ${this.state.description}`);
        console.log(`category: ${this.state.category}`);
        console.log(`retail_price: ${this.state.retail_price}`);
        console.log(`manufacturer_price: ${this.state.manufacturer_price}`);
        console.log(`quantity: ${this.state.quantity}`);

        const formData = new FormData();
        formData.set('ref_no', this.state.ref_no);
        formData.set('product_name', this.state.product_name);
        formData.set('description', this.state.description);
        formData.set('category', this.state.category);
        formData.set('total_quantity', this.state.quantity);
        formData.set('manufacturer_price', this.state.manufacturer_price);
        formData.set('retail_price', this.state.retail_price);
        formData.append('product_img',this.state.product_img);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        axios.post('http://localhost:4000/products/upload', formData, config)
            .then(res => console.log(res.data));

        this.setState({
            ref_no:0,
            product_name:'',
            description:'',
            category:'',
            manufacturer_price: 0.00,
            retail_price: 0.00,
            quantity: 0,
            product_img: null
        });

    }
    render() {
        return (
            <div>
                <div style={{marginTop: 20}}>
                    <h3>Add New Product</h3>
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
                            <input type="text" className="form-control" onChange={this.onChangeDescription}
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
            </div>
        );
    }

}

export default AddProducts;