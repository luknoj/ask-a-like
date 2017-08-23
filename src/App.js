import React, {Component} from 'react';
import './css/bootstrap.css';
import './css/my_app.css';
import firebase from './firebase.js';
import Navigation from './Navigation';
import Header from './Header';
import FormPost from './FormPost';

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
      this.setState({posts});
    });
    const commentRef = firebase.database().ref('comments');

    commentRef.on('value', (snapshot) => {
      const data = snapshot.val();
      const comments = [];

      for (const key in data) {
        comments.push({
          id: key,
          postId: data[key].postId,
          commentContent: data[key].commentContent,
          commentUsername: data[key].commentUsername,
          commentDate: data[key].commentDate,
        });
      }
      comments.reverse();
      this.setState({comments});
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
        <Header/>
        <Navigation/>

        <div className='row justify-content-center'>
          <div className='col-md-3'>
            <section id="Add post">
              <form onSubmit={(e) => this.handleSubmitPost(e)}>
                <FormPost/>
              </form>
            </section>
          </div>
          <div className='margin-t col-sm-6'>
            <section className='display-item'>
              <div>
                <h1 className="text-center">Newest Posts</h1>
                {this.state.posts.map((post) => {
                  return (
                    <div className="margin-b card">
                      <div className="card-header">
                        <div className="row">
                          <div className="col-md-6">
                            <strong>{post.postTitle}</strong>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="col post-content rounded margin-b">
                          <p className="card-text">{post.postContent}</p>
                        </div>
                        {/*::::::::::::::::::USUWANIE POSTA::::::::::::::::::*/}
                        <div className="row">
                          <div className="col-md-6">
                            <button className="btn btn-primary" onClick={() => this.removeItemPost(post.id)}>Remove post
                            </button>
                          </div>

                          <div className="col-md-6">
                            <footer className="blockquote-footer margin-b text-right">Author: {post.postUsername}
                              <br/>{post.postDate}</footer>
                          </div>
                        </div>
                      </div>

                      <div className="card-body">
                        <section id="display-comment">
                          <div className="row align-items-top justify-content-center">
                            <div className="col">
                              {this.state.comments.map((comment) => {
                                if (post.postId === comment.postId) {
                                  return (
                                    <div className="row">
                                      <div className="col-md-11 comment margin-b rounded">
                                        <p className="card-text text-justify margin-t">
                                          {comment.commentContent}
                                        </p>
                                        <p className="blockquote-footer text-right">
                                          {comment.commentUsername}
                                          <br/>
                                          {comment.commentDate}
                                        </p>
                                      </div>
                                      <div className="col-md-1">
                                        <button
                                          className="btn btn-primary"
                                          onClick={() => this.removeItemComment(comment.id)}>X
                                        </button>
                                      </div>
                                    </div>
                                  );
                                };
                              })}
                            </div>
                          </div>
                        </section>
                      </div>

                      <div className="card-body">
                        <section id="Add comment">
                          <form onSubmit={(e) => this.handleSubmitComment(e, post)}>
                            <div className="row align-items-top">
                              <div className="col-md-2">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="commentUsername"
                                  placeholder="name"
                                  required
                                />
                                <button className='btn btn-primary margin-t size-go'>GO!</button>
                              </div>

                              <div className="col-md-10">
                                  <textarea
                                    rows="6"
                                    type="text"
                                    className="form-control"
                                    name="commentContent"
                                    placeholder="Your post"
                                    required/>
                              </div>
                            </div>
                          </form>
                        </section>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
