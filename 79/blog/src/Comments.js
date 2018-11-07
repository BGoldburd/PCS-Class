import React, { Component } from 'react';

class Comments extends Component {
    state = {
        showComments: false
    }

    handleToggleComments = () => {
        if (!this.state.comments) {
            this.fetchComments(this.props.postId);
        } else {
            this.setState({
                showComments: !this.state.showComments
            });
        }
    }

    fetchComments = id => {
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
        .then(response => response.json())
        .then(comments => {
            this.setState({
                comments: comments,
                showComments: true
            });
        });
    }

    renderComments = comments => {
        const commentsList = comments.map(comment => (
                <section className="text-primary ml-5">
                    <h5>{comment.name} says:</h5>
                    <p>{comment.body}</p>
                    <p>Contact Email: {comment.email}</p>
                    <hr/>
                </section>
            ));
        
        return commentsList;
    }

    render() { 
        return (
            <React.Fragment>
                <button className="btn btn-sm btn-primary mt-2 mb-2" onClick={this.handleToggleComments}>
                            {this.state.showComments ? 'hide' : 'show'} Comments</button>
                {this.state.showComments && <p>{this.renderComments(this.state.comments)}</p>}
            </React.Fragment>
        );
    }
}
 
export default Comments;