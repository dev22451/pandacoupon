import {createSlice} from '@reduxjs/toolkit';
import {Toast, useToast} from 'native-base';
import {ApiService} from '../../api';
import {getCategoryRequest} from './categorySlice';
import {getCoupon} from './couponSlice';
import {storeData, clearAll} from '../../helpers/localStorgae';

export const loginSlice = createSlice({
  name: 'user',
  initialState: {
    userData: [],
    token: '',
    isError: false,
    errorMessage: '',
    isLoading: false,
    isLoggedIn: false,
    fbDeviceToken: '',
    isLoggedOut:false,
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
    logoutRequested(state, action) {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = '';
    },
    logoutSuccessful(state, action) {
      state.isLoading = false;
      state.token = action.payload.token;
      state.userData = action.payload.userData;
      state.isLoggedIn= false;
    },
    logoutFailed(state, action) {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload.errorMessage;
    },
    updateUserLocationRequested(state, action) {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = '';
    },
    updateUserLocationSuccessful(state, action) {
      state.isLoading = false;
      state.token = action.payload.token;
      state.userData = action.payload.userData;
      state.isLoggedOut = true;
    },
    updateUserLocationFailed(state, action) {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload.errorMessage;
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
    restoreUser: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.userData = action.payload.userData;
    },
    userLogout: (state, action) => {
      state.isLoggedIn = false;
      state.userData = [];
      state.token = '';
    },
    updateDeviceToken: (state, action) => {
      state.fbDeviceToken = action.payload;
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
  apiSuccessful,
  logoutSuccessful,
  logoutRequested,
  logoutFailed,
  updateDeviceToken,
  updateUserLocationRequested,
  updateUserLocationSuccessful,
  updateUserLocationFailed,
} = loginSlice.actions;

export const login = ({payload}) => {
  return async (dispatch, getState) => {
    dispatch(loginRequested());
    try {
      const res = await ApiService.login(payload);
      if (res.data.success) {
        Toast.show({
          title: 'Login Success',
          placement: 'top',
          status: 'success',
          duration: 3000,
          description: `You have logged in`,
        });
        await storeData('userData', res.data.data);
        dispatch(
          loginSuccessful({
            userData: res.data.data,
            token: res.data.data.accessToken,
          }),
        );
      } else {
        dispatch(
          loginFailed({
            errorMessage: res.data.message || 'something Went wrong',
          }),
        );
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
        }),
      );
      Toast.show({
        title: 'Something went wrong',
        duration: 3000,
        placement: 'top',
        status: 'error',
        description: e?.response?.data?.errors || 'something Went wrong',
      });
    }
  };
};

export const logout = (payload,token) => {
  return async (dispatch, getState) => {
    dispatch(logoutRequested());
    try {
      const res = await ApiService.logout(payload,token);
      
      if (res.data.success) {
        Toast.show({
          title: 'Logout Success',
          placement: 'top',
          status: 'success',
          duration: 3000,
          description: `You have logged out`,
        });
        
        dispatch(
          logoutSuccessful({
            userData: '',
            token: '',
        
          }),
          await clearAll()
        );
        
      } else {
        dispatch(
          logoutFailed({
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
          }),
        );
        Toast.show({
          title: 'Something went wrong',
          duration: 3000,
          placement: 'top',
          status: 'error',
        });
      }
    } catch (e) {
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

export const updateUserLocation = (payload) => {
  return async (dispatch, getState) => {
    dispatch(updateUserLocationRequested());
    try {
    const {token, userData} = getState().loginSlice;

      const res = await ApiService.updateLocation(payload,token);
      if (res.data.success) {
        Toast.show({
          title: 'Location Update',
          placement: 'top',
          status: 'success',
          duration: 3000,
          //description: 'Location Updated.',
        });
        dispatch(updateUserLocationSuccessful());
        
      } else {
        dispatch(
          updateUserLocationFailed({
            errorMessage: res.data.message || 'something Went wrong',
          }),
        );
        Toast.show({
          title: 'Location not update',
          duration: 3000,
          placement: 'top',
          status: 'error',
        });
      }
    } catch (e) {
      dispatch(
        updateUserLocationFailed({
          errorMessage: e?.response?.data?.errors || 'something Went wrong',
        }),
      );
    }
  };
};

export const logOut = () => {
  return async (dispatch, getState) => {
    dispatch(userLogout());
    clearAll();
  };
};

export default loginSlice.reducer;
