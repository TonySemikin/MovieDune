import { combineReducers } from 'redux';
import {
  FETCH_MOVIES,
  SEARCH_MOVIES,
  NETWORK_ERROR,
  CHANGE_THEME,
  RESET_ERROR
} from '../../constants/actionTypes';

import { themes } from '../../constants/themes';

const initialMoviesState = {
  allMovies: [],
  filteredMovies: [],
};

function getMovies(state = initialMoviesState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_MOVIES:
      const uniqueRecords = new Set();
      const allMovies = [];

      payload.forEach(movie => {
        const { title, release_year, director } = movie;
        const hash = `${title}${release_year}${director}`;
        const m = {
          title: title || 'Unnamed Movie',
          releaseYear: release_year || 'Unknown Year',
          director: director || 'Unknown Director',
          hash,
        };

        if (!uniqueRecords.has(hash)) {
          uniqueRecords.add(hash);
          allMovies.push(m);
        };
      });

      return ({
        allMovies,
        filteredMovies: allMovies,
      });

    case SEARCH_MOVIES:
      const filteredMovies = state.allMovies.filter((movie) => {
        const minifiedTitle = movie.title.replace(/[^\w]/g, '').toLowerCase();
        const minifiedSearch = payload.replace(/[^\w]/g, '').toLowerCase();

        return minifiedTitle.includes(minifiedSearch);
      });

      return ({
        filteredMovies,
        allMovies: state.allMovies,
      });

    default:
      return state;
  }
}

export function changeTheme(state = themes.GLASSY_SANDS.key, action) {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_THEME:
      return payload;

    default:
      return state;

  }
}

function trackStatus(state = 'initial', action) {
  const { type } = action;

  switch (type) {
    case FETCH_MOVIES:
      return 'running';

    case NETWORK_ERROR:
      return 'error';

    case RESET_ERROR:
      return 'resetError';

    default:
      return state;

  }
}

const rootReducer = combineReducers({
  movies: getMovies,
  theme: changeTheme,
  status: trackStatus,
});

export default rootReducer;
