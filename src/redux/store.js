import {configureStore} from '@reduxjs/toolkit';

import {loginSlice, locationSlice} from './slices';

export const store = configureStore({
  reducer: {loginSlice, locationSlice},
});
