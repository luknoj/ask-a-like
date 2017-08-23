import React from 'react';

const Navigation = () => (
  <div className="row">
    <div className="col-sm-12">
      <ul className="nav nav-pills justify-content-center">
        <li className="nav-item">
          <a className="nav-link" href="#Home">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#Posts">Posts</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#Link">Link</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#Disabled">Disabled</a>
        </li>
      </ul>
    </div>
  </div>
);

export default Navigation;