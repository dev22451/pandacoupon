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
    isRedeem:false
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
    }
  },
});

export const {
  getCouponRequested,
  getCouponSuccessful,
  getCouponFailed,
  resetError,
  resetSlice,
  redeemCouponRequested,
  redeemCouponSuccessful,
  redeemCouponFailed
} = couponSlice.actions;

export default couponSlice.reducer;

export const getCoupon = () => {
  return async (dispatch, getState) => {
    dispatch(getCouponRequested());
    const {token} = getState().loginSlice;
    try {
      const res = await ApiService.getCoupon(token);
      
      if (res.data.success) {
        dispatch(
          getCouponSuccessful({
            couponList: res.data.data,
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

export const redeemCoupon = (_id) => {
  return async (dispatch, getState) => {
    dispatch(redeemCouponRequested());
    const {token, userData:{email}} = getState().loginSlice;
    try {
      const res = await ApiService.redeemCoupon({_id, userEmail:email},token);
      if (res.data.success) {
        dispatch(
          redeemCouponSuccessful()
        );
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
      console.log(e,'owowowowo')
      dispatch(
        redeemCouponFailed({
          errorMessage: e?.response?.data?.errors || "Something went wrong",
        })
      );
    }
  };
};