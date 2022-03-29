import config from '../config';
import version from '../version.json';

let initialState = {
  version: version.version,
  build: version.build,
};

initialState = { ...initialState, ...config };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
