import React, { Fragment } from 'react';

import MoviesList from '../containers/MoviesList';
import SearchBox from '../containers/SearchBox';
import ThemesMenu from '../containers/ThemesMenu';

export default function SearchPage(props) {
  return (
    <Fragment>
      <header>
        <ThemesMenu />
        <SearchBox />
      </header>
      <main>
        <MoviesList />
      </main>
    </Fragment>
  );
}
