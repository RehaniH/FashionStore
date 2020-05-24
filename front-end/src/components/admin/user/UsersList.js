import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';

import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import Logout from "../layout/Logout-Modal";

class UsersList extends Component {

    constructor(props) {
        super(props);
        this.state = { users: [] };
    }

    onDeleteClick(id) {
        axios
            .delete('http://localhost:4000/api/users/'+id)
            .then(res => {
                this.props.history.push("/usersList");
            })
            .catch(err => {
                console.log("Error form ShowBookDetails_deleteClick"+err);
            })
    };

    componentDidMount() {
        axios.get('http://localhost:4000/api/users/allUsers')
            .then(response => {
                this.setState({ users: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    componentDidUpdate() {
        axios.get('http://localhost:4000/api/users/allUsers')
            .then(response => {
                this.setState({ users: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    render() {
        const { users } = this.state;
        if(this.props.auth.user.role === 'admin') {
        return (
            <div>
                <div id="wrapper">
                    <Sidebar/>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Navbar/>
                            <div className="container-fluid">
                                <Link className="btn btn-success mb-3" to="/addUser">Add Customer</Link>
                                <div >
                                    <div className="card shadow mb-4">
                                        <div className="card-header py-3">
                                            <h6 className="m-0 font-weight-bold text-primary">Customers</h6>
                                        </div>
                                        <div className="card-body">
                                            <table className="table" id="dataTable" width="100%" cellSpacing="0">
                                        <thead>
                                        <tr>
                                            <th className="text-dark">#</th>
                                            <th className="text-dark">Name</th>
                                            <th className="text-dark">Email</th>
                                            <th className="text-dark">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            users && users.map((user, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{i+1}</td>
                                                        <td>{user.name}</td>
                                                        <td>{user.email}</td>
                                                        <td>
                                                            <button className="btn btn-danger"  onClick={this.onDeleteClick.bind(this,user._id)} >Delete</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </table>
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
        );
        } else {
            return <Redirect to='/login' />
        }
    }
}

UsersList.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(UsersList);