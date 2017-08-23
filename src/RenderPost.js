import React from 'react';
const RenderPost = () => (
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
      );

export default RenderPost;
