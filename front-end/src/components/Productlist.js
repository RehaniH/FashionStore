
import axios from 'axios';
import React, { Component } from 'react';


import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import CartView from "./CartView";

 class Productlist extends Component {


     constructor(props) {
         super(props);
         this.state = {
             pro: [],
             qnty:"",

         }
         this.indexNumber = this.indexNumber.bind(this);
         this.onChangeQty=this.onChangeQty.bind(this);


     }

     componentDidMount() {
         axios.get('http://localhost:4000/pr')
             .then(response => {
                 this.setState({pro:response.data})
                 console.log(response)
             })
             .catch(error => {
                 console.log(error)
             })
     }

    onChangeQty(e) {
        this.setState({ qnty: e.target.value })
     }

   indexNumber = (i)=> {
       const { user } = this.props.auth;
       console.log(i)
       var obj = {}
       obj.id = this.state.pro[i]._id;
       obj.title=this.state.pro[i].title;
       obj.username = user.name;
       obj.quantity = this.state.qnty;
       obj.price = this.state.pro[i].price;

       console.log(obj);

       // this.setState({qnty: ''});


       axios.post('http://localhost:4000/addcart', obj)
          .then(res => console.log((res.data)))
           .catch(error => {
               console.log(error)
           })

   }
     render() {
         const { pro }=this.state
         return (
             <div>
             {pro.map((post,index)=><div key={post.id}>
             <div className="row">
                 <div className="col-sm-6 col-md-4">
                     <div className="thumbnail">
                         <img src={post.imagePath}
                              alt="..."></img>
                         <div className="caption">
                             <h3>{post.title}</h3>
                             <p>{post.description}</p>
                             <input value={this.state.qnty} onChange={this.onChangeQty.bind(this)} type="number"/>
                             <p>Rs.{post.price}</p>
                             <button type="button" onClick={this.indexNumber.bind(this,index)} className="btn btn-success">Add To Cart</button>

                         </div>
                     </div>
                 </div>
             </div>
             </div>)


             }
             </div>
         )
     }
 }
   // export default Productlist
Productlist.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Productlist);