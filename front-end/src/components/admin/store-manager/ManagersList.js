import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class ManagersList extends Component {

    constructor(props) {
        super(props);
        this.state = { users: [] };
    }

    onDeleteClick(id) {
        axios
            .delete('http://localhost:4000/api/users/'+id)
            .then(res => {
                this.props.history.push("/managersList");
            })
            .catch(err => {
                console.log("Error form ShowBookDetails_deleteClick"+err);
            })
    };

    componentDidMount() {
        axios.get('http://localhost:4000/api/users/allManagers')
            .then(response => {
                this.setState({ users: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    componentDidUpdate() {
        axios.get('http://localhost:4000/api/users/allManagers')
            .then(response => {
                this.setState({ users: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    render() {
        const { users } = this.state;
        return (
            <div >
                <table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
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
                                        <Link to={"editemployee/" + user._id} className="btn btn-primary">Edit</Link>
                                    </td>
                                    <td>
                                        <button onClick={this.onDeleteClick.bind(this,user._id)} >Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}