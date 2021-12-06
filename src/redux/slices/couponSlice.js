import { createSlice } from "@reduxjs/toolkit";
import {ApiService} from "../../api";

const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    couponList: [],
    isLoading: false,
    isError: false,
    errorMessage: "",
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
  resetSlice
} = couponSlice.actions;


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
export default couponSlice.reducer;