import {createSlice} from '@reduxjs/toolkit';

import {ApiService} from '../../api';

export const loginSlice = createSlice({
  name: 'user',
  initialState: {
    userType: false,
    userData: [],
    token: '',
    isLoading: false,
    isError: false,
    errorMessage: '',
  },
  reducers: {
    loginRequested(state, action) {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = '';
    },
    loginSuccessful(state, action) {
      state.isLoading = false;
      state.token = action.payload.token;
      state.userData = action.payload.userData;
    },
    loginFailed(state, action) {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload.errorMessage;
    },
    updateLogin(state, action) {
      state.userType = action.payload;
    },
    resetLogin(state, action) {
      state.userType = action.payload;
    },
  },
});

export const {
  updateLogin,
  resetLogin,
  loginRequested,
  loginSuccessful,
  loginFailed,
} = loginSlice.actions;

export const login = ({payload}) => {
  return async (dispatch, getState) => {
    dispatch(loginRequested());
    try {
      const res = await ApiService.login(payload);
      console.log(res.data.success);
      if (res.data.success) {
        dispatch(updateLogin(true));
        dispatch(
          loginSuccessful({
            userData: res.data.data,
            token: res.data.data.token,
          }),
        );
      }
    } catch (e) {
      console.log(e.response.data.errors);
      dispatch(
        loginFailed({
          errorMessage: e.response.data.errors || 'something Went wrong',
        }),
      );
    }
  };
};

export default loginSlice.reducer;
