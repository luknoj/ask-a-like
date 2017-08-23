import React from 'react';

const InputComment = () => (
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
          <div>
          <div className="col-md-10">
            <textarea
              rows="6"
              type="text"
              className="form-control"
              name="commentContent"
              placeholder="Your post"
              required />
          </div>
        </div>
      </form>
    </section>
  </div>
</div>
);
})}
</div>
);

export default InputComment;
