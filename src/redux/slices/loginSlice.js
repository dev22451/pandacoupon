import {createSlice} from '@reduxjs/toolkit';
import {Toast, useToast} from 'native-base';
import {ApiService} from '../../api';
import {getCategoryRequest} from './categorySlice';
import {getCoupon} from './couponSlice';
import { storeData, clearAll } from '../../helpers/localStorgae';

export const loginSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,

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
      state.isLoggedIn = true;
    },
    apiSuccessful(state,action){
      state.isLoading = false
    },
    loginFailed(state, action) {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload.errorMessage;
    },
    updateLogin(state, action) {
      state.isLoggedIn = action.payload;
    },
    resetLogin(state, action) {
      state.isLoggedIn = action.payload;
    },
    restoreUser: (state,action) => {
      state.token = action.payload.token;
      state.userData = action.payload.userData;
      state.isLoggedIn = true;
    },
    userLogout: (state,action) => {
      state.isLoggedIn= false,
      state.userData= [],
      state.token= ''
    },
  },
});

export const {
  updateLogin,
  resetLogin,
  loginRequested,
  loginSuccessful,
  loginFailed,
  restoreUser,
  userLogout,
  apiSuccessful
} = loginSlice.actions;

export const login = ({payload}) => {
  return async (dispatch, getState) => {
    dispatch(loginRequested());
    try {
      const res = await ApiService.login(payload);
      console.log(res.data)
      if (res.data.success) {
        Toast.show({
          title: 'Login Success',
          placement: 'top',
          status: 'success',
          duration: 3000,
          description: `You have logged in`,
        });
        await storeData(
          'userData',
          res.data.data
        );
        dispatch(
          loginSuccessful({
            userData: res.data.data,
            token: res.data.data.accessToken,
          }),
        );
        dispatch(getCategoryRequest());
        dispatch(getCoupon());
      } else {
        dispatch(
          loginFailed({
            errorMessage: res.data.message || 'something Went wrong',
          }))
        Toast.show({
          title: res.data.message || 'Something went wrong',
          duration: 3000,
          placement: 'top',
          status: 'error',
        });
      }
    } catch (e) {
      dispatch(
        loginFailed({
          errorMessage: e?.response?.data?.errors || 'something Went wrong',
        }))
      Toast.show({
        title: 'Something went wrong',
        duration: 3000,
        placement: 'top',
        status: 'error',
        description: e?.response?.data?.errors || 'something Went wrong',
      })
    }
  };
};

export const register = ({payload}, navigation) => {
  return async (dispatch, getState) => {
    dispatch(loginRequested());
    try {
      const res = await ApiService.register(payload);
      console.log(res,'wiwi')
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
        dispatch(
          loginFailed({
            errorMessage: res.data.message || 'something Went wrong',
          }))
        Toast.show({
          title: 'Something went wrong',
          duration: 3000,
          placement: 'top',
          status: 'error',
        });
      }
    } catch (e) {
      console.log(e)
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

export const logOut = () => {
  return async (dispatch, getState) => {
    dispatch(userLogout());
    clearAll()
  }
}

export default loginSlice.reducer;
