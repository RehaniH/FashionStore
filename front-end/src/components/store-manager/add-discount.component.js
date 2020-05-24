import React, {Component} from "react";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import StoreMangerSideBar from "./layout/store-manger-side-bar";
import Navbar from "../admin/layout/Navbar";
import Footer from "../admin/layout/Footer";
import Logout from "../admin/layout/Logout-Modal";
class AddDiscountComponent extends Component{

    constructor(props) {
        super(props);

        this.state ={
            p_id:'',
            discount_id :'',
            product_id:0,
            product_name:'',
            description:'',
            retail_price:0.00,
            manufactured_price:0.00,
            discount_percentage: 0,
            total_quantity: 0,
            discount: 0.00,
            discount_price:0.00,
            category:'',
            start_date: new Date(),
            end_date: new Date(),
            new_gain: 0.00,
            errors:{
                discount_percentage: '',
                discount: '',
                discount_price: '',
            }
        };

        this.onChangeDiscountPercentage  = this.onChangeDiscountPercentage.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/products/'+ this.props.match.params.id)
            .then(response =>{
                this.setState({
                    p_id: response.data._id,
                    product_id: response.data.ref_no,
                    manufacturer_price: response.data.manufacturer_price,
                    retail_price: response.data.retail_price,
                    description: response.data.description,
                    product_name: response.data.name,
                    category: response.data.category,
                    total_quantity: response.data.total_quantity,
                });
                
                if(response.data.discount !== undefined){
                    this.setState({
                        discount_id: response.data.discount._id,
                        discount_percentage: response.data.discount.discount_percentage,
                        discount_price: response.data.discount.discount_price,
                        discount: response.data.discount.discount,
                        start_date: new Date(response.data.discount.start_date),
                        end_date: new Date(response.data.discount.end_date)
                    })
                }
            })
            .catch();
    }

    previousPage = () =>{
        this.props.history.push('/dashboard');
    };

    onChangeDiscountPercentage(e) {
        let msg, suggestion= '';

        let discount= this.state.retail_price *  (e.target.value/100);
        let price = this.state.retail_price - discount;

        (discount > (this.state.retail_price - this.state.manufacturer_price)? msg = 'Discount cannot exceed gain' : msg = '' );
        (msg !== '' ? suggestion = 'reduce the discount percentage': suggestion = '' );
        this.setState({
            discount_percentage: e.target.value,
            discount_price: price,
            discount: discount,
            errors:{
                discount_price: msg,
                discount_percentage: suggestion,
            }
        });
    }

    onChangeStartDate = start_date => {
        this.setState({
            start_date
        });
        console.log(start_date)
    };

    onChangeEndDate = end_date => {
        this.setState({
            end_date
        });
        console.log(end_date)
    };

    validateForm(){

        let discountPercentage = '';
        let valid = true;

        if(this.state.discount_percentage === 0 || this.state.discount_percentage === undefined){
            discountPercentage = 'Discount percentage cannot be missing or empty.';
            valid = false
        }

        this.setState({
            errors:{
                discount_percentage: discountPercentage
            }
        });

        return valid;

    }

    onSubmit = e =>{
        e.preventDefault();
        let create = true;
        let valid = this.validateForm();
        if(this.state.discount_id !== undefined || this.state.discount_id !== ''){
            create = false;
        }

        const discountObj = {
            product_id: this.state.p_id,
            discount_percentage: this.state.discount_percentage,
            discount_price: this.state.discount_price,
            discount: this.state.discount,
            start_date: this.state.start_date,
            end_date: this.state.end_date
        };

        if(this.validateForm()){
            if(create){
                axios.post('http://localhost:4000/discount/create', discountObj)
                    .then(respose => console.log(respose))
                    .catch(function (err) {
                        console.log(err);
                    });

                this.previousPage();

            }else{
                axios.put('http://localhost:4000/discount/' + this.state.discount_id, discountObj)
                    .then(respose => console.log(respose))
                    .catch(function (err) {
                        console.log(err);
                    });

                this.previousPage();
            }

            this.setState({
                discount_percentage: 0,
                discount_price: 0.00,
                discount: 0.00,
                start_date: new Date(),
                end_date: new Date()
            });
        }

    };

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
                                    <div style={{marginTop: 20}} className='container-fluid card shadow mb-4'>

                                        <div className="card-header py-3">
                                            <h3 className="m-0 font-weight-bold text-primary">
                                                {this.state.discount.discount_id !== undefined ? 'Edit Discount': 'Add New Discount'}
                                            </h3>
                                        </div>

                                        <div className="card-body">
                                            <div className='container-fluid'>
                                                <div className='container-md'>
                                                    <p>Product No <span className='text-info'>#{this.state.product_id}</span></p>
                                                    <p><strong>{this.state.product_name}</strong></p>
                                                </div>
                                                <div className='container-md'>
                                                    <form onSubmit={this.onSubmit}>
                                                        <div className='row'>
                                                            <div className='col-md-4'>
                                                                <div className="form-group">
                                                                    <label className='text-info font-weight-bold'>Quantity </label>
                                                                    <input type='number' value={this.state.total_quantity} disabled={true} className='form-control'/>
                                                                </div>
                                                            </div>
                                                            <div className='col-md-4'>
                                                                <div className="form-group">
                                                                    <label className='text-info font-weight-bold'>Manufactured Price </label>
                                                                    <input type='number' value={this.state.manufacturer_price} disabled={true} className='form-control'/>
                                                                </div>
                                                            </div>
                                                            <div className='col-md-4'>
                                                                <div className="form-group">
                                                                    <label className='text-info font-weight-bold'>Retail Price </label>
                                                                    <input type='number' value={this.state.retail_price} disabled={true} className='form-control'/>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='row'>
                                                            <div className='col-md-4'>
                                                                <div className="form-group">
                                                                    <label className='text-info font-weight-bold'>Discount Percentage </label>
                                                                    <input type="number" className="form-control" onChange={this.onChangeDiscountPercentage}
                                                                           value={this.state.discount_percentage}/>

                                                                    { this.state.errors.discount_percentage !== undefined && this.state.errors.discount_percentage.length > 0 &&
                                                                    <small className='text-danger'>{this.state.errors.discount_percentage}</small>}
                                                                </div>
                                                            </div>
                                                            <div className='col-md-4'>
                                                                <div className="form-group">
                                                                    <label className='text-info font-weight-bold'>Discount Price </label>
                                                                    <input type="number" className="form-control" name='discount_price'
                                                                           value={this.state.discount_price} readOnly/>
                                                                    {this.state.errors.discount_price !== undefined && this.state.errors.discount_price.length > 0 &&
                                                                    <small className='text-danger'>{this.state.errors.discount_price}</small>}
                                                                </div>
                                                            </div>
                                                            <div className='col-md-4'>
                                                                <div className="form-group">
                                                                    <label className='text-info font-weight-bold'>Discount </label>
                                                                    <input type="number" className="form-control" name='discount'
                                                                           value={this.state.discount} readOnly/>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='row'>
                                                            <div className='col-md-4'>
                                                                <label className='text-info font-weight-bold'>Start Date : </label>
                                                                <span className='text-info ml-3'>{this.state.start_date.toDateString()}</span>
                                                                <Calendar onChange={this.onChangeStartDate} value={this.state.start_date} minDate={new Date()}/>
                                                            </div>
                                                            <div className='col-md-4'>
                                                                <label className='text-info font-weight-bold'>End Date : </label>
                                                                <span className='text-info ml-3'>{this.state.end_date.toDateString()}</span>
                                                                <Calendar onChange={this.onChangeEndDate} value={this.state.end_date} minDate={this.state.start_date}/>
                                                            </div>
                                                        </div>

                                                        <div className="d-flex flex-row-reverse">
                                                            <input type="submit" className="btn btn-info m-3" value="Save"/>
                                                            <button className='btn btn-success m-3' onClick={this.previousPage}>Cancel</button>
                                                        </div>
                                                    </form>

                                                </div>
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

        ); } else {
            return <Redirect to='/login' />
        }
    }
}


AddDiscountComponent.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(AddDiscountComponent);