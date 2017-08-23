import React from 'react';

const FormPost = () => (
  <div>
    <div className="form-group">
      <label htmlFor="username">Username</label>
      <input type="text"
             className="form-control"
             name="postUsername"
             placeholder="name"
             required
      />
    </div>
    <div className="form-group">
      <label htmlFor="title">Title</label>
      <input
        type="text"
        className="form-control"
        name="postTitle"
        placeholder="Title"
        required
      />
    </div>
    <div className="form-group">
      <label htmlFor="text">Input your question here!</label>
      <textarea
        type="text"
        className="form-control"
        name="postContent"
        placeholder="question"
      />
    </div>
    <div className="form-group">
      <button className='add-post'>Add Item</button>
    </div>
  </div>
);

export default FormPost;
