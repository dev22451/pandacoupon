import { createSlice } from "@reduxjs/toolkit";
import {ApiService} from "../../api";

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categoryList: [],
    isLoading: true,
    isError: false,
    errorMessage: "",
    page:1,
    //totalpage:1,
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
    updateCategoryRequested: (state, action) => {
      state.isLoading = true;
      state.errorMessage = "";
      state.isError = false;
    },
    updateCategorySuccessful: (state, action) => {
      state.isLoading = false;
      state.page = action.payload.page;
    },
    updateCategoryFailed: (state, action) => {
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
  updateCategoryRequested,
  updateCategorySuccessful,
  updateCategoryFailed,
  resetError,
  resetSlice
} = categorySlice.actions;
export default categorySlice.reducer;

export const getCategoryRequest = () => {
  return async (dispatch, getState) => {
    dispatch(getCategoryRequested());
    const {token} = getState().loginSlice;
    try {
      const res = await ApiService.getCategory(token,1);
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

export const updateCategoryRequest=(page)=>{
  return async (dispatch, getState) => {
    console.log(page,"gfyug");
    dispatch(updateCategoryRequested());
    const {token} = getState().loginSlice;
    try {
      const res = await ApiService.getCategory(token,page);
      //console.log(res.data,'gfuygds');
      if (res?.data?.success) {
        dispatch(
          updateCategorySuccessful({
            categoryList: res.data.data,
          })
        );
      }
    } catch (e) {
      dispatch(
        updateCategoryFailed({
          errorMessage: e?.response?.data?.errors || "Something went wrong",
        })
      );
    }
  };
};
