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
        this.validateForm = this.validateForm.bind(this);

        this.state = {
            product_id: 0,
            product_name:"",
            category:"",
            quantity: 0,
            manufacturer_price: 0.00,
            retail_price: 0.00,
            description:"",
            product_img:null,
            categories:[],

            errors: {
                product_id: "",
                product_name:"",
                category:"",
                quantity: "",
                manufacturer_price: "",
                retail_price: "",
                description:"",
            }
        }
    }
    componentDidMount() {
        axios.get('http://localhost:4000/category/all')
            .then(response =>{
            this.setState({
                categories: response.data
            });
            console.log(response.data);
        }).catch(err => console.log('error'))
    }

    onChangeRefNo(e){

        if(e.target.value === undefined || e.target.value == null){
            this.setState({
                errors:{
                    product_id: 'product id cannot be missing or empty'
                }
            });
        }

        this.setState({
            product_id: e.target.value
        });
    }

    onChangeProductName(e){

        let errorMsg  = '';
        (e.target.value !== '' && e.target.value.length < 5) ? errorMsg = 'Product name should be greater than 3 characters': errorMsg = '';
        this.setState({
            product_name: e.target.value,
            errors :{product_name: errorMsg}
        });
    }
    onChangeQuantity(e){

        let errorMsg  = '';
        (e.target.value !== 0 && e.target.value < 5) ? errorMsg = 'quantity should be greater than 5': errorMsg = '';

        this.setState({
            quantity: e.target.value,
            errors :{quantity: errorMsg}
        });
    }
    onChangeManufacturerPrice(e){

        let errorMsg  = '';
        (e.target.value !== 0 && e.target.value < 100.00) ? errorMsg = 'manufactured price should be greater than Rs.100 ': errorMsg = '';
        this.setState({
            manufacturer_price: e.target.value,
            errors :{manufacturer_price: errorMsg}
        });
    }

    onChangeRetailPrice(e){

        let errorMsg  = '';
        (e.target.value !== 0 && (e.target.value < this.state.manufacturer_price)) ? errorMsg = 'retail price should be greater than manufactured price ': errorMsg = '';
        this.setState({
            retail_price: e.target.value,
            errors :{retail_price: errorMsg}
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

    validateForm() {

        let formIsValid = true;
        let productName = '';
        let productId = '';
        let productCategory = '';
        let manufacturedPrice = '';
        let retailPrice = '';
        let productQuantity = '';

        if(this.state.product_name === ''){
            productName = 'product name cannot be missing or empty';
            formIsValid = false;
        }

        if(this.state.product_id === ''){
            productId = 'product id cannot be missing or empty';
            formIsValid = false;
        }

        if(this.state.category === ''){
            productCategory = 'product category cannot be missing or empty';
            formIsValid = false;
        }

        if(this.state.manufacturer_price === 0.00){
            manufacturedPrice = 'manufactured price cannot be missing or empty';
            formIsValid = false;
        }

        if(this.state.retail_price === 0.00){
            retailPrice = 'retail price cannot be missing or empty';
            formIsValid = false;
        }

        if(this.state.quantity === 0){
            productQuantity = 'product quantity cannot be missing or empty';
            formIsValid = false;
        }

        this.setState({
            errors: {
                product_id: productId,
                product_name:productName,
                category:productCategory,
                quantity: productQuantity,
                manufacturer_price: manufacturedPrice,
                retail_price: retailPrice,
            }
        });

        return formIsValid;

    }

    onSubmit(e){
        e.preventDefault();

        if(this.validateForm()){

            console.log(`Form submitted`);
            console.log(`Name : ${this.state.product_name}`);
            console.log(`ref_no : ${this.state.ref_no}`);
            console.log(`Description : ${this.state.description}`);
            console.log(`category: ${this.state.category}`);
            console.log(`retail_price: ${this.state.retail_price}`);
            console.log(`manufacturer_price: ${this.state.manufacturer_price}`);
            console.log(`quantity: ${this.state.quantity}`);

            const formData = new FormData();
            formData.set('product_id', this.state.product_id);
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
                product_id:0,
                product_name:'',
                description:'',
                category:'',
                manufacturer_price: 0.00,
                retail_price: 0.00,
                quantity: 0,
                product_img: null
            });
        }

    }
    render() {
        return (
            <div className='container-fluid'>
                <div style={{marginTop: 20}}>
                    <h3>Add New Product</h3>
                    <form onSubmit={this.onSubmit}>

                        <div className="form-group">
                            <label>Product No: </label>
                            <input type="text" className="form-control" onChange={this.onChangeRefNo} name='productId'
                                   value={this.state.product_id} />
                            {this.state.errors.product_id !== undefined && this.state.errors.product_id.length !== 0 &&
                            <span className='error'>{this.state.errors.product_id}</span>}
                        </div>

                        <div className="form-group">
                            <label>Product Name: </label>
                            <input type="text" className="form-control" onChange={this.onChangeProductName} name='productName'
                                   value={this.state.product_name} />
                            {this.state.errors.product_name !== undefined && this.state.errors.product_name.length > 0 &&
                            <span className='error'>{this.state.errors.product_name}</span>}
                        </div>

                        <div className="form-group">
                            <label>Description: </label>
                            <textarea  className="form-control" onChange={this.onChangeDescription} name='description'
                                   value={this.state.description} />
                        </div>

                        <div className="form-group">
                            <label>Quantity: </label>
                            <input type="number" className="form-control" onChange={this.onChangeQuantity} name='quantity'
                                   value={this.state.quantity} />
                            {this.state.errors.quantity !== undefined &&
                            <span className='error'>{this.state.errors.quantity}</span>}
                        </div>

                        <div className="form-group">
                            <label>Manufactured Price: </label>
                            <input type="number" className="form-control" onChange={this.onChangeManufacturerPrice} name='manufacturerPrice'
                                   value={this.state.manufacturer_price} />
                            {this.state.errors.manufacturer_price !== undefined &&
                            <span className='error'>{this.state.errors.manufacturer_price}</span>}
                        </div>
                        <div className="form-group">
                            <label>Retail Price: </label>
                            <input type="number" className="form-control" onChange={this.onChangeRetailPrice} name='retailPrice'
                                   value={this.state.retail_price} />
                            {this.state.errors.retail_price !== undefined &&
                            <span className='error'>{this.state.errors.retail_price}</span>}
                        </div>

                        <div className="form-group">
                            <label>Category: </label>
                            <select className="form-control" value={this.state.category} onChange={this.onChangeCategory}>
                                {this.state.categories.map(category => <option key={category._id} value={category._id}>{category.name}</option>)}
                            </select>
                            {this.state.errors.category !== undefined && this.state.errors.category.length > 0 &&
                            <span className='error'>{this.state.errors.category}</span>}
                        </div>

                        <div className="form-group">
                            <label>Product Image: </label>
                            <input type="file" className="form-control" onChange={this.onChangeFile} name="someFile" />
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