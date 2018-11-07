import React, { Component } from 'react';
import Comments from './Comments';

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: ''
        }

        this.getPosts(this.props.id);
    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
          this.getPosts(this.props.id);
        }
      }


    getPosts = id => {
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
        .then(response => response.json())
        .then(posts => {
          this.setState({
            posts: posts,
            name: id
          })
          console.log(posts);
        });
    }
    
    render() {
        const posts = this.state.posts ?
            this.state.posts.map((post, index) => (
                <section key={index}>
                    <h3>{post.title}</h3>
                    <div>{post.body}</div>
                    <Comments postId={post.id}/>
                    <hr/>
                </section>
            )) : null;

        return ( 
            <div>
                {this.props.users && <h2 className="text-center m-4"><u>{this.props.users[this.props.id - 1].name}'s posts</u></h2>}
                {posts}
            </div>
         );
    }
}
 
export default Posts;