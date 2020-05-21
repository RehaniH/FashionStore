import axios from 'axios';
import React, { Component } from 'react';
//import Payment from "./Payment";

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
        axios.get('http://localhost:4000/username/andrew')
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


        return (


            <table className="table table-striped" >
                <thead>
                <tr>
                    <th scope="col">Cart</th>
                    <th scope="col">Quantity</th>
                    <th scope="col"> Item Price</th>
                    <th scope="col"> Total</th>
                </tr>
                </thead>
                {cart.map((post,index) => <tbody key={post.id}>
                    <tr>
                        <td>{post.title}</td>
                        <td>{post.quantity}     <input defaultValue = {this.state.newqnty} onChange={(e) => cart[index].quantity = e.target.value}  type="number"/>
                            <button type="submit" className="btn btn-success" onClick={e => this.updateQnty(e,post._id,index)}>Update Quantity</button><pre></pre><button type="button" className="btn btn-danger" onClick={this.deleteItem.bind(this,post._id)}>Delete Item</button> </td>
                        <td>{post.price}</td>
                        <td> {post.quantity*post.price}</td>
                    </tr>

                </tbody>)

                }

<strong>Sub Total : {this.getSubTotal()}
</strong>

                <button type="button"  onClick={() => this.props.history.push('/pay/' + this.getSubTotal())} className="btn btn-outline-success">Checkout</button>




                </table>



        )


    }
}
export default CartView;
