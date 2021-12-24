import {createSlice} from '@reduxjs/toolkit';
import {ApiService} from '../../api';false
import {Toast} from 'native-base';

const couponSlice = createSlice({
  name: 'coupon',
  initialState: {
    couponList: [],
    isLoading: true,
    isError: false,
    errorMessage: '',
    isRedeem: false,
    couponItem: {},
    bannerImage:[],
    couponData:{},
    page:1,
    totalpages:1,
    totalDoc:0,
  },
  reducers: {
    getCouponRequested: (state, action) => {
      state.isLoading = true;
      state.errorMessage = '';
      state.isError = false;
      state.couponList =[];
    },
    getCouponSuccessful: (state, action) => {
      state.isLoading = false;
      state.couponList= action.payload.couponList;
      state.totalDoc = action.payload.totalDoc;
    },
    getCouponFailed: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.errorMessage;
      state.isError = true;
    },
    updateCouponRequested: (state, action) => {
      state.isLoading = true;
      state.errorMessage = '';
      state.isError = false;
      //state.couponList =[];
    },
    updateCouponSuccessful: (state, action) => {
      state.isLoading = false;
      state.couponList= state.couponList.concat(action.payload.couponList);
      state.page =state.page+1;
      state.totalpages=action.payload.totalpages;
    },
    updateCouponFailed: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.errorMessage;
      state.isError = true;
    },

    getCouponDataRequested: (state, action) => {
      state.isLoading = true;
      state.errorMessage = '';
      state.isError = false;
      state.couponData = {}
    },
    getCouponDataSuccessful: (state, action) => {
      state.isLoading = false;
      state.couponData = action.payload.couponData;
    },
    getCouponDataFailed: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.errorMessage;
      state.isError = true;
    },
    getBannerImageRequested: (state, action) => {
      state.isLoading = true;
      state.errorMessage = '';
      state.isError = false;
    },
    getBannerImageSuccessful: (state, action) => {
      state.isLoading = false;
      state.bannerImage = action.payload.bannerImage;
    },
    getBannerImageFailed: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.errorMessage;
      state.isError = true;
    },

    redeemCouponRequested: (state, action) => {
      state.isRedeem = true;
      state.errorMessage = '';
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
      state.isLoading = true;
      state.errorMessage = '';
      state.isError = false;
    },
    getCouponRedeemSuccessful: (state, action) => {
      state.isLoading = false;
      state.couponItem = action.payload.couponItem;
    },
    getCouponredeemFailed: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.errorMessage;
      state.isError = true;
    },
    resetError: (state, action) => {
      state.isError = false;
    },
    resetSlice: (state, action) => {
      state = {
        couponList: [],
        isLoading: false,
        isError: false,
        errorMessage: '',
      };
    },
    
  },
});

export const {
  getCouponDataRequested,
  getCouponDataSuccessful,
  getCouponDataFailed,
  updateCouponRequested,
  updateCouponSuccessful,
  updateCouponFailed,
  updateCouponDataSuccessful,
  updateCouponDataFailed,
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
  getBannerImageRequested,
  getBannerImageSuccessful,
  getBannerImageFailed,
} = couponSlice.actions;

export default couponSlice.reducer;

export const getCoupon = (page) => {
  return async (dispatch, getState) => {
    dispatch(getCouponRequested());
    const {token} = getState().loginSlice;
    const {location} = getState().locationSlice;
    try {
      const payload = {
        token,
        additionalUrl: `uLat=${location.latitude}&uLon=${location.longitude}`,
      };
      const res = await ApiService.getCoupon(payload,1);
      if (res?.data?.success) {
        dispatch(
          getCouponSuccessful({
            totalDoc: res.data.resData.totalDocs,
            couponList: res.data.data.coupons,
          }),
        );
      } else {
        dispatch(
          getCouponFailed({
            errorMessage: res?.data?.message || 'Something went wrong',
          }),
        );
      }
    } catch (e) {
      dispatch(
        getCouponFailed({
          errorMessage: e?.response?.data?.errors || 'Something went wrong',
        }),
      );
    }
  };
};


export const updateCoupon = (page) => {
  
  return async (dispatch, getState) => {
    console.log(page,'call')
    dispatch(updateCouponRequested());
    const {token} = getState().loginSlice;
    const {location} = getState().locationSlice;
    try {
      const payload = {
        token,
        additionalUrl: `uLat=${location.latitude}&uLon=${location.longitude}`,
      };
      const res = await ApiService.getCoupon(payload,page);
      const limit = res.data.resData.limit;
      const totalDoc=res.data.resData.totalDocs
      const total = Math.ceil(totalDoc/limit);
      console.log(total,'dyugug');
      if (res?.data?.success) {
        dispatch(
          updateCouponSuccessful({
            totalpages:total,
            couponList: res.data.data.coupons,
          }),
        );
      } else {
        dispatch(
          updateCouponFailed({
            errorMessage: res?.data?.message || 'Something went wrong',
          }),
        );
      }
    } catch (e) {
      dispatch(
        updateCouponFailed({
          errorMessage: e?.response?.data?.errors || 'Something went wrong',
        }),
      );
    }
  };
};

export const getBannerImage = () => {
  return async (dispatch, getState) => {
    dispatch(getBannerImageRequested());
    const {token} = getState().loginSlice;
    try {
      const payload = {
        token,
      };
      const res = await ApiService.getBanner();
      if (res.data.success) {
        dispatch(
          getBannerImageSuccessful({
            bannerImage: res.data.data,
          }),
        );
      } else {
        dispatch(
          getBannerImageFailed({
            errorMessage: res?.data?.errors || 'Something went wrong',
          }),
        );
      }
    } catch (e) {
      dispatch(
        getBannerImageFailed({
          errorMessage: e?.response?.data?.errors || 'Something went wrong',
        }),
      );
    }
  };
};



export const getCouponRedeem = _id => {
  return async (dispatch, getState) => {
    dispatch(getCouponRedeemRequested());
    const {
      token,
      userData: {email},
    } = getState().loginSlice;
    token;
    try {
      const res = await ApiService.getRedeemData(
        {couponId: _id, userEmail: email},
        token,
      );

      if (res.data.success) {
        dispatch(
          getCouponRedeemSuccessful({
            couponItem: res.data.data.isRedeem,
          }),
        );
      } else {
        dispatch(
          getCouponredeemFailed({
            errorMessage: res?.data?.message || 'Unable to get data',
          }),
        );  
      }
    } catch (e) {
      dispatch(
        getCouponredeemFailed({
          errorMessage: e?.response?.data?.errors || 'unable to get data',
        }),
      );
    }
  };
};

export const redeemCoupon = _id => {
  return async (dispatch, getState) => {
    dispatch(redeemCouponRequested());
    const {
      token,
      userData: {email},
    } = getState().loginSlice;
    try {
      const res = await ApiService.redeemCoupon({_id, userEmail: email}, token);
      if (res.data.success) {
        dispatch(redeemCouponSuccessful());
        dispatch(getCouponRedeem(_id));
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
            errorMessage: res?.data?.message || 'Something went wrong',
          }),
        );
        Toast.show({
          title: res?.data?.message || 'Something went wrong',
          duration: 3000,
          placement: 'top',
          status: 'error',
        });
      }
    } catch (e) {
      dispatch(
        redeemCouponFailed({
          errorMessage: e?.response?.data?.errors || 'Something went wrong',
        }),
      );
    }
  };
};


export const getCouponWithId = _id => {
  return async (dispatch, getState) => {
    dispatch(getCouponDataRequested());
    const {token} = getState().loginSlice;
    try {
      
      const res = await ApiService.getCouponById({_id},token);
      if (res.data.success) {
        dispatch(
          getCouponDataSuccessful({
            couponData: res.data.data.coupon[0],
          }),
        );
      } else {
        dispatch(
          getCouponDataFailed({
            errorMessage: res?.data?.message || 'Unable to get data',
          }),
        );
      }
    } catch (e) {
      dispatch(
        getCouponDataFailed({
          errorMessage: e?.response?.data?.errors || 'Unable to get data',
        }),
      );
    }
  };
};