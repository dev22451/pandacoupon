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
  getCategory: async () => {
    return fireAjax({
      method: 'GET',
      URL: `${ApiUrl.getCategory}`,
      // data: payload,
    });
  },
  getCoupon: async () => {
    return fireAjax({
      method: 'GET',
      URL: `${ApiUrl.getCoupon}`,
    });
  },
  getUser: async payload => {
    return fireAjax({
      method: 'GET',
      URL: `${ApiUrl.getUser}`,
    });
  },
};
