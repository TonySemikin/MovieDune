import React from 'react';

export default function Error(props) {
  const { type, tryAgain, container } = props;

  switch (type) {
    case 'fatal':
      return (
        <div className={`error ${container}__error`}>
          <span>Please check internet connection...</span>
          <br />
          <button onClick={tryAgain} className='movies__btn'>Try Again</button>
        </div>
      );

    case 'no_match':
      return (
        <div className={`error ${container}__error`}>
          <span>No movies found...</span>
        </div>
      );

    default:
      return;
  }
}
