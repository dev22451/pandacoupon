import fireAjax from '../axios/api';
import ApiUrl from '../axios/url';

export const ApiService = {
  login: async payload => {
    return fireAjax({
      method: 'POST',
      URL: `${ApiUrl.userLogin}`,
      data: payload,
    });
  },
  register: async payload => {
    return fireAjax({
      method: 'POST',
      URL: `${ApiUrl.userRegister}`,
      data: payload,
    });
  },
  getCategory: async (token,page) => {
    //console.log(page,'raj');
    const limit = 10
    return fireAjax({
      method: 'GET',
      URL: `${ApiUrl.getCategory}?page=${page}&limit=${limit}`,
      token,
    });
  },
  getCoupon: async ({token, additionalUrl,page}) => {
    console.log(page,'apicall');
    const url = additionalUrl
    ? `${ApiUrl.getCoupon}?${additionalUrl}`
    : `${ApiUrl.getCoupon}`
    const limit = 5
    return fireAjax({
      method: 'GET',
      URL: additionalUrl
      ? `${ApiUrl.getCoupon}?${additionalUrl}`
      : `${ApiUrl.getCoupon}`,
      // ?page=${page}&limit=${limit},
      token,
    });
  },
  getCategoryCoupon: async ({token, payload}) => {
    return fireAjax({
      method: 'POST',
      URL: `${ApiUrl.getCategoryCoupon}`,
      token,
      data: payload,
    });
  },
  getUser: async token => {
    return fireAjax({
      method: 'GET',
      URL: `${ApiUrl.getUser}`,
      token,
    });
  },
  redeemCoupon: async (data, token) => {
    return fireAjax({
      method: 'POST',
      URL: `${ApiUrl.redeem}`,
      data,
      token,
    });
  },
  getRedeemData: async (data, token) => {
    return fireAjax({
      method: 'POST',
      URL: `${ApiUrl.getRedeem}`,
      token,
      data,
    });
  },
  logout: async (data,token) => {
    return fireAjax({
      method: 'POST',
      URL: `${ApiUrl.userLogout}`,
      token,
      data
    });
  },

  updateLocation: async (data,token) => {
    return fireAjax({
      method: 'POST',
      URL: `${ApiUrl.updateLocation}`,
      token,
      data
    });
  },

  redeemCouponbyUser: async (data,token) => {
    //console.log(page,'page');
    return fireAjax({
      method: 'POST',
      URL: `${ApiUrl.redeemCouponbyUser}`,
      token,
      data
    });
  },
  
  getBanner: async (token) => {
    return fireAjax({
      method: 'GET',
      URL: `${ApiUrl.getBanner}`,
      token,
    });
  },
  
  getNotification: async (data,token) => {
    return fireAjax({
      method: 'GET',
      URL: `${ApiUrl.getNotification}?userEmail=${data.userEmail}`,
      token,
    });
  },
  getCouponById: async (data,token) => {
    return fireAjax({
      method: 'GET',
      URL: `${ApiUrl.getCouponById}?_id=${data._id}`,
      token,
    });
  },
};
