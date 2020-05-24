import React, {Component} from "react";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import {makeStyles} from "@material-ui/core/styles";
import StoreMangerSideBar from "./layout/store-manger-side-bar";
import Navbar from "../admin/layout/Navbar";
import Footer from "../admin/layout/Footer";
import Logout from "../admin/layout/Logout-Modal";
class editProductsComponent extends Component {

    constructor(props) {
        super(props);

        this.enableEditing = this.enableEditing.bind(this);
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
            product_id:"",
            p_id:"",
            product_name:"",
            category:"",
            total_quantity: 0,
            manufacturer_price: 0.00,
            retail_price: 0.00,
            description:"",
            product_img: '',
            categories:[],
            is_disabled: true,
            btn_update: 'Edit',
            errors: {
                product_id: "",
                product_name:"",
                category:"",
                quantity: "",
                manufacturer_price: "",
                retail_price: "",
                description:"",
                product_img: ""
            }
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/products/' + this.props.match.params.id)
            .then(response=>{
                this.setState({
                    p_id: response.data._id,
                    product_id: response.data.ref_no,
                    product_name:response.data.name,
                    category:response.data.category._id,
                    total_quantity: response.data.total_quantity,
                    manufacturer_price: response.data.manufacturer_price,
                    retail_price: response.data.retail_price,
                    description:response.data.description,
                    product_img:response.data.product_image
                })
            });

        axios.get('http://localhost:4000/category/allCategories')
            .then(response =>{
                this.setState({
                    categories:  [{_id: 'first', name:'Select category'}].concat(response.data)
                });
                console.log(response.data);
            }).catch(err => console.log('error'))
    }

    previousPage = () =>{
        this.props.history.push('/dashboard');
    };
    enableEditing(e){
        this.setState({
            is_disabled: false,
            product_img: '',
        })
    }

    onChangeRefNo(e){
        let errorMsg  = '';
        (e.target.value === 0 && e.target.value === '') ? errorMsg = 'Product id cannot be zero or empty': errorMsg = '';
        this.setState({
            product_id: e.target.value,
            errors :{product_id: errorMsg}
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
            total_quantity: e.target.value,
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

        console.log('in function');
        console.log(e.target.files[0]);
        this.setState({
            product_img: e.target.files[0],
            product_img_preview: URL.createObjectURL(e.target.files[0]),
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
        let productImage = '';
        if(this.state.product_name === ''){
            productName = 'product name cannot be missing or empty';
            formIsValid = false;
        }

        if(this.state.product_id === '' || this.state.product_id === 0){
            productId = 'product id cannot be missing or empty';
            formIsValid = false;
        }

        if(this.state.category === '' || this.state.category._id === 'first'){
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
        if(this.state.product_img === null || this.state.product_img === undefined){
            productImage = 'product image cannot be missing or empty';
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
                product_img: productImage
            }
        });

        return formIsValid;

    }

    onSubmit(e){
        e.preventDefault();

        if(this.validateForm()){

            const formData = new FormData();
            formData.set('product_id', this.state.product_id);
            formData.set('product_name', this.state.product_name);
            formData.set('description', this.state.description);
            formData.set('category', this.state.category);
            formData.set('total_quantity', this.state.total_quantity);
            formData.set('manufacturer_price', this.state.manufacturer_price);
            formData.set('retail_price', this.state.retail_price);
            formData.append('product_img',this.state.product_img);

            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };

            axios.put('http://localhost:4000/products/' + this.state.p_id, formData, config)
                .then(res => console.log(res.data));

            this.setState({
                product_id:0,
                product_name:'',
                description:'',
                category:'',
                manufacturer_price: 0.00,
                retail_price: 0.00,
                total_quantity: 0,
                product_img: null
            });

            this.previousPage();
        }

    }
    render() {

        const { user } = this.props.auth;
        const classes = makeStyles((theme) => ({
            root: {
                '& > *': {
                    margin: theme.spacing(1),
                },
            },
            input: {
                display: 'none',
            },
        }));
        if(this.props.auth.user.role === 'manager') {
        return (

            <div>
                <div>
                    <div id="wrapper">
                        <StoreMangerSideBar/>
                        <div id="content-wrapper" className="d-flex flex-column">
                            <div id="content">
                                <Navbar/>
                                <div className='container-fluid'>
                                    <div style={{marginTop: 20}} className='container-fluid card shadow mb-4'>

                                        <div className="card-header py-3">
                                            <h5 className="m-0 font-weight-bold text-primary">Product Info</h5>
                                        </div>

                                        <div className="card-body">
                                        <form onSubmit={this.onSubmit}>
                                        <fieldset disabled={this.state.is_disabled}>

                                         <div className='row'>
                                            <div className='col-md-6'>
                                                <div className='row'>
                                                    <div className='col-md-6'>
                                                        <div className="form-group">
                                                            <label className='text-info font-weight-bold'>Product No </label>
                                                            <input type="text" className="form-control" onChange={this.onChangeRefNo}
                                                                   value={this.state.product_id}/>
                                                            {this.state.errors.product_id !== undefined && this.state.errors.product_id.length > 0 &&
                                                            <small className='text-danger'>{this.state.errors.product_id}</small>}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='row'>
                                                    <div className='col-md-6'>
                                                        <div className="form-group">
                                                            <label className='text-info font-weight-bold'>Product Name </label>
                                                            <input type="text" className="form-control" onChange={this.onChangeProductName}
                                                                   value={this.state.product_name}/>
                                                            {this.state.errors.product_name !== undefined && this.state.errors.product_name.length > 0 &&
                                                            <small className='text-danger'>{this.state.errors.product_name}</small>}
                                                        </div>
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <div className="form-group">
                                                            <label className='text-info font-weight-bold'>Category </label>
                                                            <select className="form-control" value={this.state.category} onChange={this.onChangeCategory}>
                                                                {this.state.categories.map(category => <option key={category._id} value={category._id}>{category.name}</option>)}
                                                            </select>
                                                            {this.state.errors.category !== undefined && this.state.errors.category.length > 0 &&
                                                            <small className='text-danger'>{this.state.errors.category}</small>}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='row'>
                                                    <div className='col-md-6'>
                                                        <div className="form-group">
                                                            <label className='text-info font-weight-bold'>Description </label>
                                                            <textarea className="form-control" onChange={this.onChangeDescription}
                                                                      value={this.state.description}/>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <div className="form-group">
                                                            <label className='text-info font-weight-bold'>Quantity </label>
                                                            <input type="number" className="form-control" onChange={this.onChangeQuantity}
                                                                   value={this.state.total_quantity}/>
                                                            {this.state.errors.quantity !== undefined && this.state.errors.quantity.length > 0 &&
                                                            <small className='text-danger'>{this.state.errors.quantity}</small>}
                                                        </div>
                                                    </div>
                                                </div>


                                                <div className='row'>
                                                    <div className='col-md-6'>
                                                        <div className="form-group">
                                                            <label className='text-info font-weight-bold'>Manufactured Price </label>
                                                            <input type="number" className="form-control" onChange={this.onChangeManufacturerPrice}
                                                                   value={this.state.manufacturer_price}/>
                                                            {this.state.errors.manufacturer_price !== undefined && this.state.errors.manufacturer_price.length > 0 &&
                                                            <small className='text-danger'>{this.state.errors.manufacturer_price}</small>}
                                                        </div>
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <div className="form-group">
                                                            <label className='text-info font-weight-bold'>Retail Price </label>
                                                            <input type="number" className="form-control" onChange={this.onChangeRetailPrice}
                                                                   value={this.state.retail_price}/>
                                                            {this.state.errors.retail_price !== undefined && this.state.errors.retail_price.length > 0 &&
                                                            <small className='text-danger'>{this.state.errors.retail_price}</small>}
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                            <div className='col-md-6 card-body'>
                                                {this.state.product_img_preview !== undefined && this.state.product_img_preview !== null ?
                                                    <img src={this.state.product_img_preview} width='300px' height='400px' alt='preview of uploaded image' /> :
                                                    <img src={this.state.product_img} width='300px' height='400px' alt='product image' />}
                                            </div>
                                            <div className={classes.root}>
                                                <label className='text-info font-weight-bold'>Product Image </label>
                                                {this.state.product_img !== undefined && this.state.product_img !== null &&
                                                <p className='text-success'>{this.state.product_img.name}</p>}
                                                <input
                                                    accept="image/*"
                                                    className={classes.input}
                                                    id="contained-button-file"
                                                    type="file"
                                                    onChange={this.onChangeFile} name="someFile" style={{display: 'none'}}
                                                />
                                                <label htmlFor="contained-button-file">
                                                    <Button variant="contained" color="primary" startIcon={<CloudUploadIcon/>} component="span">
                                                        Upload
                                                    </Button>
                                                </label>
                                            </div>
                                         </div>
                                            <div className="d-flex flex-row-reverse">
                                                {
                                                    this.state.is_disabled !== true ? <input type="submit" className="btn btn-info m-3" value="Save"/>: ''
                                                }

                                            </div>

                                        </fieldset>
                                    </form>
                                            <div className='d-flex flex-row-reverse'>
                                                {
                                                    this.state.is_disabled !== false ? <button className='btn btn-info ml-3' onClick={this.enableEditing}>{this.state.btn_update}</button>: ''
                                                }
                                                <button className='btn btn-success ml-3' onClick={this.previousPage}>Cancel</button>
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
            </div>);
        } else {
            return <Redirect to='/login' />
        }
    }
}

editProductsComponent.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(editProductsComponent);