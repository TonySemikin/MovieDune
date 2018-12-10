import { searchMovies } from '../index';
import {
  SEARCH_MOVIES,
} from '../../../constants/actionTypes';

// Example for one case only

describe('actions creator works well and search movies', () => {
  it('has a correct type', () => {
    const action = searchMovies();

    expect(action.type).toEqual(SEARCH_MOVIES);
  });

  it('has a correct payload', () => {
    const action = searchMovies('Pulp Fiction');

    expect(action.payload).toEqual('Pulp Fiction');
  });
});
