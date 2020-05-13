import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const CommentSingle = (props) => {
    const  comment  = props.comment;

    return(
        <div className="card-container">
            
            <div className="desc">
                <h2>
                    <Link to={`/comments/show-comment/${comment._id}`}>
                        { comment.email }
                    </Link>
                </h2>
                <h3>{comment.ratings}</h3>
                <p>{comment.comment}</p>
            </div>
        </div>
    )
};

export default CommentSingle;