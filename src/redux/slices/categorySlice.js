import { createSlice } from "@reduxjs/toolkit";
import {ApiService} from "../../api";

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categoryList: [],
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
    getCategorySuccessful: (state, action) => {
      state.isLoading = false;
      state.categoryList = action.payload.categoryList;
    },
    getCategoryFailed: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.errorMessage;
      state.isError = true;
    },
    resetError: (state, action) => {
      state.isError = false
    },
    resetSlice: (state, action) => {
      state = {
        categoryList: [],
        isLoading: false,
        isError: false,
        errorMessage: "",
      }
    }
  },
});

export const {
  getCategoryRequested,
  getCategorySuccessful,
  getCategoryFailed,
  resetError,
  resetSlice
} = categorySlice.actions;
export default categorySlice.reducer;

export const getCategoryRequest = () => {
  return async (dispatch, getState) => {
    dispatch(getCategoryRequested());
    
    try {
      const res = await ApiService.getCategory();
      console.log(res.data,'asd4as65d4')
      if (res.data.success) {
        dispatch(
          getCategorySuccessful({
            categoryList: res.data.data.couponData,
          })
        );
      }
    } catch (e) {
      dispatch(
        getCategoryFailed({
          errorMessage: e?.response?.data?.errors || "Something went wrong",
        })
      );
    }
  };
};
