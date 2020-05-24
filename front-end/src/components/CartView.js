import axios from 'axios';
import React, { Component } from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
//import Payment from "./Payment";
import { Redirect, Link } from 'react-router-dom';

import HeaderD from "./public/layout/Header Desktop";
import HeaderM from "./public/layout/Header Mobile";
import Slider from "./public/layout/Slider";
import Footer from "./public/layout/Footer";


class CartView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cart: [],
            newqnty:''

        }
        this.getSubTotal=this.getSubTotal.bind(this);
        this.onChangenewQty=this.onChangenewQty.bind(this);
       this.deleteItem=this.deleteItem.bind(this);
    }

    componentDidMount() {
        const { user } = this.props.auth;
        axios.get('http://localhost:4000/username/'+user.name)
            .then(response => {
                this.setState({cart: response.data})
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

   getSubTotal=()=>{
var tot=0;
       for(var i=0 ; i<this.state.cart.length; i++){
           tot += parseInt(this.state.cart[i].price) * parseInt(this.state.cart[i].quantity)
       }
       return tot

    }

    onChangenewQty(e) {
        this.setState({ newqnty: e.target.value })
    }

    updateQnty = (e,id,index) => {
        e.preventDefault()
        console.log("hyyy" + id);
        axios.put('http://localhost:4000/update-student/' + id + "/" + this.state.cart[index].quantity)
            .then(res => console.log((res.data)))
            window.location.reload()
            .catch(error => {
                console.log(error)
            })


    }

    deleteItem=(id)=>{

        console.log(id)
        axios.delete('http://localhost:4000/delete-item/'+id)
            .then((res) => {
                console.log('Student successfully deleted!')
                window.location.reload();
            }).catch((error) => {
            console.log(error)
        })
    }





    render() {

        const { cart }=this.state
       // const { user } = this.props.auth;
        if(this.props.auth.user.role === 'user') {

            return (

                <div>
                {/* Header */}
                <header>
                    {/* Header desktop */}
                    <HeaderD/>
                    {/* Header Mobile */}
                    <HeaderM/>
                    {/* Menu Mobile */}
                </header>
                {/* Slider */}


                <div style={{margin: "52px"}}>
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                    <table className="table table-striped" style={{borderColor: "black", borderStyle: "solid"}}>
                        <thead style={{fontSize: "larger", backgroundColor: "black", color: "white"}}>
                        <tr>
                            <th scope="col">Cart</th>
                            <th scope="col">Quantity</th>
                            <th scope="col"> Item Price</th>
                            <th scope="col"> Total</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        {cart.map((post, index) => <tbody key={post.id}>
                        <tr style={{backgroundColor: "gainsboro"}}>
                            <td>{post.title}</td>
                            <td className="row">{post.quantity}
                                <input className="ml-4 mr-4" defaultValue={post.quantity}
                                       onChange={(e) => cart[index].quantity = e.target.value} type="number"
                                       name="quantity" min="1" max="100"/>
                                <button className="ml-4" type="submit" className="btn btn-success"
                                        onClick={e => this.updateQnty(e, post._id, index)}>Update Quantity
                                </button>
                                <br></br>
                            </td>

                            <td>{post.price}</td>
                            <td> {post.quantity * post.price}</td>
                            <td>
                                <button type="button" className="btn btn-danger"
                                        onClick={this.deleteItem.bind(this, post._id)}>Delete Item
                                </button>
                            </td>

                            <br></br> <br></br><br></br><br></br></tr>

                        </tbody>)

                        }
                    </table>
                    <br></br>

                    <div style={{
                        margin: "auto",
                        width: "25%",
                        border: " 3px solid #73AD21",
                        padding: "15px",
                        textAlign: "center",
                        backgroundColor: "white"
                    }}>

                        <strong>Sub Total : {this.getSubTotal()}
                        </strong>
                        <br></br><br></br>
                        <button style={{textAlign: "center", paddingRight: "55px", paddingLeft: "55px"}} type="button"
                                onClick={() => this.props.history.push('/pay/' + this.getSubTotal())}
                                className="btn btn-success">Checkout
                        </button>

                    </div>


                </div>

                <Footer/>
             
             </div>


            )
        } else {
            return <Redirect to='/login' />
        }



    }
}
//export default CartView;
CartView.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(CartView);
