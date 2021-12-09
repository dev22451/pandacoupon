import { createSlice } from "@reduxjs/toolkit";
import {ApiService} from "../../api";
import {Toast, useToast} from 'native-base';

const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    couponList: [],
    isLoading: false,
    isError: false,
    errorMessage: "",
    isRedeem:false,
    isRedeemCoupon:false,
    couponItem:{},
    couponCategoryList:[]
  },
  reducers: {
    getCouponRequested: (state, action) => {
      state.isLoading = true;
      state.errorMessage = "";
      state.isError = false;
    },
    getCouponSuccessful: (state, action) => {
      state.isLoading = false;
      state.couponList = action.payload.couponList;
    },
    getCouponFailed: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.errorMessage;
      state.isError = true;
    },
    redeemCouponRequested: (state, action) => {
      state.isRedeem = true;
      state.errorMessage = "";
      state.isError = false;
    },
    redeemCouponSuccessful: (state, action) => {
      state.isRedeem = false;
    },
    redeemCouponFailed: (state, action) => {
      state.isRedeem = false;
      state.errorMessage = action.payload.errorMessage;
      state.isError = true;
    },
    getCouponRedeemRequested: (state, action) => {
      state.isRedeemCoupon = true;
      state.errorMessage = "";
      state.isError = false;
    },
    getCouponRedeemSuccessful: (state, action) => {
      state.isRedeemCoupon = false;
      state.couponItem = action.payload.couponItem
    },
    getCouponredeemFailed: (state, action) => {
      state.isRedeemCoupon = false;
      state.errorMessage = action.payload.errorMessage;
      state.isError = true;
    },
    resetError: (state, action) => {
      state.isError = false
    },
    resetSlice: (state, action) => {
      state = {
        couponList: [],
        isLoading: false,
        isError: false,
        errorMessage: "",
      }
    },
    getCategoryCouponRequested: (state, action) => {
      state.isLoading = true;
      state.errorMessage = "";
      state.isError = false;
    },
    getCategoryCouponSuccessful: (state, action) => {
      state.isLoading = false;
      state.couponCategoryList = action.payload;
    },
    getCategoryCouponFailed: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.errorMessage;
      state.isError = true;
    },
  },
});

export const {
  getCategoryCouponRequested,
  getCategoryCouponSuccessful,
  getCategoryCouponFailed,
  getCouponRequested,
  getCouponSuccessful,
  getCouponFailed,
  resetError,
  resetSlice,
  redeemCouponRequested,
  redeemCouponSuccessful,
  redeemCouponFailed,
  getCouponRedeemRequested,
  getCouponRedeemSuccessful,
  getCouponredeemFailed,
} = couponSlice.actions;

export default couponSlice.reducer;

export const getCoupon = () => {
  return async (dispatch, getState) => {
    dispatch(getCouponRequested());
    const {token} = getState().loginSlice;
    const {location} = getState().locationSlice;
    console.log(token,location.latitude,'locaion'); 
    try {
      const payload ={
        token,
        additionalUrl:`uLat=${112.45675}&uLon=${77.17591}`}
      const res = await ApiService.getCoupon(payload);
      console.log(res.data.success);
      
      if (res.data.success) {
        dispatch(
          getCouponSuccessful({
            couponList: res.data.data.coupons,
          })
        );
      }else{
        dispatch(
          getCouponFailed({
            errorMessage: e?.response?.data?.errors || "Something went wrong",
          })
        );
      }
    } catch (e) {
      dispatch(
        getCouponFailed({
          errorMessage: e?.response?.data?.errors || "Something went wrong",
        })
      );
    }
  };
};

export const getCategoryCoupon = (_id) => {
  return async (dispatch, getState) => {
    dispatch(getCategoryCouponRequested());
    const {token} = getState().loginSlice;
    const {location} = getState().locationSlice;
    console.log(token,location.latitude,'locaion'); 
    try {
      const payload ={
        token,
        payload:{
          categoryID:_id
        }
      }
      const res = await ApiService.getCategoryCoupon(payload);
      console.log(res)
      
      if (res.data.success) {
        dispatch(
          getCategoryCouponSuccessful({
            couponCategoryList: res.data.data,
          })
        );
      }
    } catch (e) {
      dispatch(
        getCategoryCouponFailed({
          errorMessage: e?.response?.data?.errors || "Something went wrong",
        })
      );
    }
  };
};

export const getCouponRedeem = (_id) => {
  return async (dispatch, getState) => {
    dispatch(getCouponRedeemRequested());
    const {token, userData:{email}} = getState().loginSlice;
    token
    try {
      const res = await ApiService.getRedeemData({couponId:_id, userEmail:email},token);
      
      if (res.data.success) {
        dispatch(
          getCouponRedeemSuccessful({
            couponItem: res.data.data.isRedeem
          })
        );
      }
    } catch (e) {
      dispatch(
        getCouponRedeemFailed({
          errorMessage: e?.response?.data?.errors || "Something went wrong",
        })
      );
    }
  };
};

export const redeemCoupon = (_id) => {
  return async (dispatch, getState) => {
    dispatch(redeemCouponRequested());
    const {token, userData:{email}} = getState().loginSlice;
    try {
      const res = await ApiService.redeemCoupon({_id, userEmail:email},token);
      console.log(res,'asdasd')
      if (res.data.success) {
        dispatch(
          redeemCouponSuccessful()
        );
        dispatch(getCouponRedeem(_id))
        Toast.show({
          title: 'Redeem Success',
          placement: 'top',
          status: 'success',
          duration: 3000,
          description: `Coupon is redeem`,
        });
      } else {
        dispatch(
          redeemCouponFailed({
            errorMessage: res.data.message || "Something went wrong",
          })
        ); 
        Toast.show({
          title: res.data.message || "Something went wrong",
          duration: 3000,
          placement: 'top',
          status: 'error',
        });
      }
    } catch (e) {
      dispatch(
        redeemCouponFailed({
          errorMessage: e?.response?.data?.errors || "Something went wrong",
        })
      );
    }
  };
};