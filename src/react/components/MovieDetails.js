import React from 'react';
import { Link } from 'react-router-dom';

import ThemesMenu from '../containers/ThemesMenu';

export default function MovieDetails(props) {
  return (
    <section className='movie__details'>
      <ThemesMenu />
      <span className='movie__details-item' role="img" aria-label='surprized face'>🧐</span>
      <span className='movie__details-item'>Here will be the details about movie!</span>
      <button className='movies__btn btn'>
        Go back to Search
        <Link to='/' />
      </button>
    </section>
  );
}
