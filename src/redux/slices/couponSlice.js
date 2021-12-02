import { createSlice } from "@reduxjs/toolkit";
import ApiService from "../../Api/ApiService";

const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    couponList: [],
    isLoading: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    getCategoryRequested: (state, action) => {
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


export const getCategoryRequest = () => {
  return async (dispatch, getState) => {
    dispatch(getCategoryRequested());

    try {
      const res = await ApiService.getCoupon();
      if (res.data.success) {
        dispatch(
          getCouponSuccessful({
            couponList: res.data,
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