import React from 'react';
import error from './error.png';
import './styledNotFound.css';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div className="styledNotFound">
      <h1>Oops! You might be lost</h1>
      <img src={error} alt="404 error" />
      <p>This path leads only to the dark side...</p>
      <Link to="/">Use teleport</Link>
    </div>
  );
}

export default PageNotFound;
