import { createSlice } from '@reduxjs/toolkit';
import { ApiService } from '../../api'; false
import { Toast } from 'native-base';

const categoryCouponSlice = createSlice({
    name: 'categoryCoupon',
    initialState: {
        couponCategoryList:[],
        isLoading: true,
        isError: false,
        errorMessage: '',
        page:1,
        totalPage:1,
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
            state.isLoading = false;
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
        resetError: (state, action) => {
          state.isError = false;
        },
        resetSlice: (state, action) => {
          state = {
            couponCategoryList: [],
            isLoading: true,
            isError: false,
            errorMessage: '',
          };
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
    resetError,
    resetSlice,
} = categoryCouponSlice.actions;

export default categoryCouponSlice.reducer;

export const getCategoryCoupon = (payload) => {
    return async (dispatch, getState) => {
      dispatch(getCategoryCouponRequested());
      const {token} = getState().loginSlice;
      try {
        
        const res = await ApiService.getCategoryCoupon({payload,token});
        //console.log(res.data.resData.totalDocs,'guygdu');
  
        if (res.data.success) {
          dispatch(
            getCategoryCouponSuccessful({
              couponCategoryList: res.data.data.data,
              totalDocs: res.data.resData.totalDocs
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

  export const updateCategoryCoupon = (payload) => {
    return async (dispatch, getState) => {
      dispatch(updateCategoryCouponRequested());
      const {token} = getState().loginSlice;
      try {
        const res = await ApiService.getCategoryCoupon({payload,token});
        
        const limit = res.data.resData.limit;
        const totalDoc=res.data.resData.totalDocs
        const total = Math.ceil(totalDoc/limit);
  
        if (res.data.success) {
          dispatch(
            updateCategoryCouponSuccessful({
              totalPage:total,
              couponCategoryList: res.data.data.data,
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