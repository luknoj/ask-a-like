
import React from 'react';

const RenderComment = () => (
<div className="card-body">
  <section id="display-comment">
    <div className="row align-items-top justify-content-center">
      <div className="col">
      {this.state.comments.map((comment) => {
        if(post.postId === comment.postId)
        {
        return(
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
              className="btn btn-primary" onClick={() => this.removeItemComment(comment.id)}>X</button>
            </div>
            </div>
        );
      };
    })}
      </div>
    </div>
  </section>
</div>
);
export default RenderComment;
