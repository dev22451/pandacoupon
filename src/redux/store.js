import {configureStore} from '@reduxjs/toolkit';

import {loginSlice, locationSlice, categorySlice, couponSlice} from './slices';

export const store = configureStore({
  reducer: {loginSlice, locationSlice, categorySlice, couponSlice},
});
