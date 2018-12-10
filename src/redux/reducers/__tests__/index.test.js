import { changeTheme } from '../index';
import {
  CHANGE_THEME,
} from '../../../constants/actionTypes';

import { themes } from '../../../constants/themes';

// Example for one case only

it('changes a theme', () => {
  const action = {
    type: CHANGE_THEME,
    payload: themes.GLASSY_SANDS,
  };

  const newState = changeTheme([], action);

  expect(newState).toEqual(themes.GLASSY_SANDS);
});
