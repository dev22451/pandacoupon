import {createSlice} from '@reduxjs/toolkit';
import {ApiService} from '../../api';
import {Toast, useToast} from 'native-base';

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
      Notifications: [],
      isLoading: false,
      isError: false,
      errorMessage: '',
    },
    reducers: {
        getNotificationRequested: (state, action) => {
          state.isLoading = true;
          state.errorMessage = '';
          state.isError = false;
        },
        getNotificationSuccessful: (state, action) => {
          state.isLoading = false;
          state.Notifications = action.payload.Notifications;
        },
        getNotificationFailed: (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.errorMessage = action.payload.errorMessage;
          
        },
        resetNotificationSlice:(state, action)=>{
          state.Notifications= [];
          state.isLoading= false;
          state.isError= false;
          state.errorMessage= '';

        }
    }
});

export const {
    getNotificationRequested,
    getNotificationSuccessful,
    getNotificationFailed,
    resetNotificationSlice,
}= notificationSlice.actions;

export default notificationSlice.reducer;

export const getNotification = () => {
    return async (dispatch, getState) => {
      dispatch(getNotificationRequested());
      const {token, userData:{email}} = getState().loginSlice;
   
      try {
        const payload = {
          userEmail:email

        };
        const res = await ApiService.getNotification(payload,token);
        if (res.data.success) {
          dispatch(
            getNotificationSuccessful({
              Notifications: res.data.data
            }),
          );
        } else {
          dispatch(
            getNotificationFailed({
              errorMessage: res?.data?.message || 'Something went wrong',
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
      } catch (e) {
        dispatch(
            getNotificationFailed({
            errorMessage: e?.response?.data?.errors || 'Something went wrong',
          }),
        );
      }
    };
  };