import React from 'react';
import { useSelector } from 'react-redux';

const HideButton = ({ handleLoad, handleRedirect }) => {
  const totalItems = useSelector(state => state.filter.totalItems);
  const showBooks = useSelector(state => state.filter.showBooks);

  return (
    <div>
      {showBooks.length < totalItems ? (
        <div className="wrapper">
          <button className="btnLoad" onClick={() => handleLoad()}>
            Load More
          </button>
        </div>
      ) : (
        <div className="wrapper" onClick={() => handleRedirect()}>
          <button className="btnDetails">Back to Search</button>
        </div>
      )}
    </div>
  );
};

export default HideButton;
