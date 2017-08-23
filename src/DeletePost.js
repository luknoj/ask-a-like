import React from 'react';

const DeletePost = () => (
<div className="row">
  <div className="col-md-6">
    <button className="btn btn-primary" onClick={() => this.removeItemPost(post.id)}>Remove post
    </button>
  </div>
  <div className="col-md-6">
    <footer className="blockquote-footer margin-b text-right">Author: {post.postUsername}
      <br />{post.postDate}</footer>
  </div>
</div>
</div>
);
export default DeletePost;
