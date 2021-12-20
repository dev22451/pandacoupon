import { createSlice } from "@reduxjs/toolkit";
import {ApiService} from "../../api";

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categoryList: [],
    isLoading: true,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    getCategoryRequested: (state, action) => {
      state.isLoading = true;
      state.errorMessage = "";
      state.isError = false;
      state.categoryList=[];
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
        isLoading: true,
        categoryList: [],
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
    const {token} = getState().loginSlice;
    try {
      const res = await ApiService.getCategory(token);
      if (res?.data?.success) {
        dispatch(
          getCategorySuccessful({
            categoryList: res.data.data,
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
