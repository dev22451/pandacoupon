import { createSlice } from '@reduxjs/toolkit';
import { ApiService } from '../../api'; false
import { Toast } from 'native-base';

const categoryCouponSlice = createSlice({
    name: 'categoryCoupon',
    initialState: {
        couponCategoryList:[],
        isLoading: false,
        isError: false,
        errorMessage: '',
        page:1,
        totalDocs:0,
    },
    reducers: {
        getCategoryCouponRequested: (state, action) => {
            state.isLoading = true;
            state.errorMessage = '';
            state.isError = false;
            // couponCategoryList=[]
          },
        getCategoryCouponSuccessful: (state, action) => {
            state.isLoading = false;
            state.couponCategoryList = action.payload.couponCategoryList;
            state.totalDocs = action.payload.totalDocs;
          },
        getCategoryCouponFailed: (state, action) => {
            state.isLoading = true;
            state.errorMessage = action.payload.errorMessage;
            state.isError = true;
          },
        updateCategoryCouponRequested: (state, action) => {
            state.isLoading = true;
            state.errorMessage = '';
            state.isError = false;
        },
        updateCategoryCouponSuccessful: (state, action) => {
            state.isLoading = false;
            state.couponCategoryList = state.couponCategoryList.concat(action.payload.couponCategoryList);
            state.page =state.page+1;
        },
        updateCategoryCouponFailed: (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.errorMessage;
            state.isError = true;
        },
    }
});

export const {
    getCategoryCouponRequested,
    getCategoryCouponSuccessful,
    getCategoryCouponFailed,
    updateCategoryCouponRequested,
    updateCategoryCouponSuccessful,
    updateCategoryCouponFailed,
} = categoryCouponSlice.actions;

export default categoryCouponSlice.reducer;

export const getCategoryCoupon = (_id) => {
    return async (dispatch, getState) => {
      dispatch(getCategoryCouponRequested());
      const {token} = getState().loginSlice;
      try {
        const payload = {
          token,
          payload: {
            categoryID: _id,
            // page:1,
            // limit:3,
          },
        };
        const res = await ApiService.getCategoryCoupon(payload);
  
        if (res.data.success) {
          dispatch(
            getCategoryCouponSuccessful({
              totalDocs: res.data.resData.totalDocs,
              couponCategoryList: res.data.data,
            }),
          );
        }
      } catch (e) {
        dispatch(
          getCategoryCouponFailed({
            errorMessage: e?.response?.data?.errors || 'Something went wrong',
          }),
        );
      }
    };
  };

  export const updateCategoryCoupon = (_id) => {
    return async (dispatch, getState) => {
      dispatch(updateCategoryCouponRequested());
      const {token} = getState().loginSlice;
      try {
        const payload = {
          token,
          payload: {
            categoryID: _id,
            // page:2,
            // limit:3,
          },
        };
        const res = await ApiService.getCategoryCoupon(payload);
        console.log(res.data);
  
        if (res.data.success) {
          dispatch(
            updateCategoryCouponSuccessful({
              couponCategoryList: res.data.data,
            }),
          );
        }
      } catch (e) {
        dispatch(
          updateCategoryCouponFailed({
            errorMessage: e?.response?.data?.errors || 'Something went wrong',
          }),
        );
      }
    };
  };