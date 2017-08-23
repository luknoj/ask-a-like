import React, { Component } from 'react';
import './css/bootstrap.css';
import './css/my_app.css';
import Navigation from "./Navigation.js";
import InputPost from "./InputPost.js";
import RenderPost from "./RenderPost.js";
import DeletePost from "./DeletePost.js";
import RenderComment from "./RenderComment.js";
import InputComment from "./InputComment.js";
import firebase from './firebase.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: [],
    };
  }

  handleSubmitPost(e) {
    e.preventDefault();
    const postsRef = firebase.database().ref('posts');

    // Assign all Form elements to variable.
    // e.target is a element that triggered the event, which is form in this case.
    const inputs = e.target.elements;

    postsRef.push({
      postContent: inputs.postContent.value,
      postUsername: inputs.postUsername.value,
      postTitle: inputs.postTitle.value,
      postDate: new Date().toUTCString(),
    });

    // Clear all form inputs.
    e.target.reset();
  }

  handleSubmitComment(e, post) {
    e.preventDefault();
    const commentsRef = firebase.database().ref('comments');

    // Assign all Form elements to variable.
    // e.target is a element that triggered the event, which is form in this case.
    const inputs = e.target.elements;

    commentsRef.push({
      postId: post.postId,
      commentContent: inputs.commentContent.value,
      commentUsername: inputs.commentUsername.value,
      commentDate: new Date().toUTCString(),
    });

    // Clear all form inputs.
    e.target.reset();
  }

  componentDidMount() {
    const postsRef = firebase.database().ref('posts');

      postsRef.on('value', (snapshot) => {
      const data = snapshot.val();
      const posts = [];

      for (const key in data) {
        posts.push({
          id: key,
          postId: key,
          postTitle: data[key].postTitle,
          postContent: data[key].postContent,
          postUsername: data[key].postUsername,
          postDate: data[key].postDate,
        });
      }
      posts.reverse();
      this.setState({ posts });
    });
    const commentRef = firebase.database().ref('comments');

    commentRef.on('value', (snapshot) =>{
      const data = snapshot.val();
      const comments = [];

      for(const key in data) {
        comments.push({
          id: key,
          postId: data[key].postId,
          commentContent: data[key].commentContent,
          commentUsername: data[key].commentUsername,
          commentDate: data[key].commentDate,
        });
      }
      comments.reverse();
      this.setState({ comments });
    })
  }

  removeItemComment(postId) {
    const commentsRef = firebase.database().ref(`/comments/${postId}`);
    commentsRef.remove();
  }

  removeItemPost(postId) {
    const postsRef = firebase.database().ref(`/posts/${postId}`);
    postsRef.remove();
  }



  render() {
    return (
      <div className='container-fluid'>
        <header>
          <div className='row justify-content-center'>
            <div className='col-sm-12'>
              <h1 className="display-2">ASK A LIKE</h1>
            </div>
          </div>
        </header>
        <Navigation/>
        <InputPost/>
          <div className='margin-t col-sm-6'>
            <section className='display-item'>
                <RenderPost/>
                <DeletePost/>
                <RenderComment/>
                <InputComment/>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
