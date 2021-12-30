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
        pages:1,
        totalPage:1,
        totalDocs:0,
    },
    reducers: {
        getCategoryCouponRequested: (state, action) => {
            state.isLoading = true;
            state.errorMessage = '';
            state.isError = false;
            couponCategoryList=[]
          },
        getCategoryCouponSuccessful: (state, action) => {
            state.isLoading = false;
            state.couponCategoryList = action.payload.couponCategoryList;
            state.totalDocs = action.payload.totalDocs;
            state.totalPage=action.payload.totalPage;
            state.pages = action.payload.pages;
          },
        getCategoryCouponFailed: (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.errorMessage;
            state.isError = true;
          },
        updateCategoryCouponRequested: (state, action) => {
            state.isLoading = false;
            state.errorMessage = '';
            state.isError = false;
        },
        updateCategoryCouponSuccessful: (state, action) => {
            state.isLoading = false;
            state.couponCategoryList = state.couponCategoryList.concat(action.payload.couponCategoryList);
            state.pages = action.payload.pages;
            // state.totalPage=action.payload.totalPage;
            
        },
        updateCategoryCouponFailed: (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.errorMessage;
            state.isError = true;
        },
        resetError: (state, action) => {
          state.isError = false;
        },
        resetCategoryCouponSlice: (state, action) => {
            state.couponCategoryList= [];
            state.isLoading= false;
            state.isError= false;
            state.errorMessage= '';
            state.pages=1;
            state.totalDocs=0;
            state.totalPage=1;
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
    resetCategoryCouponSlice,
} = categoryCouponSlice.actions;

export default categoryCouponSlice.reducer;

export const getCategoryCoupon = (payload) => {
    return async (dispatch, getState) => {
      dispatch(getCategoryCouponRequested());
      const {token} = getState().loginSlice;
      try {
        
        const res = await ApiService.getCategoryCoupon({payload,token});
        const limit = res.data.limit;
        const totalDoc=res.data.totalDocs
        const total = totalDoc>0 ? Math.ceil(totalDoc/limit):1;
  
        if (res.data.success) {
          dispatch(
            getCategoryCouponSuccessful({
              couponCategoryList: res.data.data,
              totalDocs: res.data.totalDocs,
              totalPage:total,
              pages:res.data.page,
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
        
        // const limit = res.data.limit;
        // const totalDoc=res.data.totalDocs
        // const total = Math.ceil(totalDoc/limit);
        
        if (res.data.success) {
          dispatch(
            updateCategoryCouponSuccessful({
              //totalPage:total,
              pages:res.data.page,
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