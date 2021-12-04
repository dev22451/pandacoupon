import {createSlice} from '@reduxjs/toolkit';
import {Toast, useToast} from 'native-base';
import {ApiService} from '../../api';
import {getCategoryRequest} from './categorySlice';
import {getCoupon} from './couponSlice';

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
    apiSuccessful(state, action) {
      state.isLoading = false;
    },
    apiFailed(state, action) {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload.errorMessage;
    },
  },
});

export const {
  updateLogin,
  resetLogin,
  loginRequested,
  loginSuccessful,
  loginFailed,
  apiSuccessful,
  apiFailed,
} = loginSlice.actions;

export const login = ({payload}) => {
  return async (dispatch, getState) => {
    dispatch(loginRequested());
    try {
      const res = await ApiService.login(payload);
      console.log(res.data.success);
      if (res.data.success) {
        dispatch(updateLogin(true));
        Toast.show({
          title: 'Login Success',
          placement: 'top',
          status: 'success',
          duration: 3000,
          description: '',
        });
        dispatch(
          loginSuccessful({
            userData: res.data.data,
            token: res.data.data.token,
          }),
        );
        dispatch(getCategoryRequest());
        dispatch(getCoupon());
      } else {
        Toast.show({
          title: 'Something went wrong',
          duration: 3000,
          placement: 'top',
          status: 'error',
        });
      }
    } catch (e) {
      console.log(e.response.data.errors);
      dispatch(
        loginFailed({
          errorMessage: e.response.data.errors || 'something Went wrong',
        }),
        Toast.show({
          title: 'Something went wrong',
          duration: 3000,
          placement: 'top',
          status: 'error',
          description: e.response.data.errors,
        }),
      );
    }
  };
};

export const register = ({payload}, navigation) => {
  return async (dispatch, getState) => {
    dispatch(loginRequested());
    try {
      const res = await ApiService.register(payload);
      console.log(res);
      if (res.data.success) {
        Toast.show({
          title: 'Account Registered',
          placement: 'top',
          status: 'success',
          duration: 3000,
          description: 'Thanks for signing up with us.',
        });
        dispatch(apiSuccessful());
        navigation.navigate('SignIn');
      } else {
        Toast.show({
          title: 'Something went wrong',
          duration: 3000,
          placement: 'top',
          status: 'error',
        });
      }
    } catch (e) {
      console.log(e.response.data.errors);
      dispatch(
        apiFailed({
          errorMessage: e.response.data.errors || 'something Went wrong',
        }),
        Toast.show({
          title: 'Something went wrong',
          duration: 3000,
          placement: 'top',
          status: 'error',
          description: e.response.data.errors,
        }),
      );
    }
  };
};

export default loginSlice.reducer;
