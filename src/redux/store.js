import {configureStore} from '@reduxjs/toolkit';

import {loginSlice, locationSlice, categorySlice, couponSlice, notificationSlice} from './slices';

export const store = configureStore({
  reducer: {loginSlice, locationSlice, categorySlice, couponSlice, notificationSlice},
});
