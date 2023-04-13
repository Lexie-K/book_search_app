import React from 'react';
import { useAppSelector } from '../../hook';

interface Props {
  handleLoad: () => void;
  handleRedirect: () => void;
}

const HideButton = ({ handleLoad, handleRedirect }: Props) => {
  const totalItems = useAppSelector(state => state.filter.totalItems);
  const showBooks = useAppSelector(state => state.filter.showBooks);

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
