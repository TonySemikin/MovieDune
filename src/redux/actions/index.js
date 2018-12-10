import axios from 'axios';
import {
  FETCH_MOVIES,
  SEARCH_MOVIES,
  NETWORK_ERROR,
  CHANGE_THEME,
  RESET_ERROR
} from '../../constants/actionTypes';

import { apiURL } from '../../constants/keys';

export const fetchMovies = props => dispatch => {
  axios.get(apiURL)
    .then(result => {
      dispatch({
        type: FETCH_MOVIES,
        payload: result.data,
      });
    })
    .catch(error => {
      dispatch({
        type: NETWORK_ERROR,
        payload: error,
      });
    });
};

export function searchMovies(name) {
  return {
    type: SEARCH_MOVIES,
    payload: name,
  };
};

export function changeTheme(themeID) {
  return {
    type: CHANGE_THEME,
    payload: themeID,
  };
};

export function resetError() {
  return {
    type: RESET_ERROR,
  };
};
