import {createSlice} from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'counter',
  initialState: {
    userType: '',
  },
  reducers: {
    updateLogin(state, action) {
      state.userType = action.payload;
    },
    resetLogin(state, action) {
      state.userType = action.payload;
    },
  },
});

export const {updateLogin, resetLogin} = loginSlice.actions;

export default loginSlice.reducer;
