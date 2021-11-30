import {login} from '../../redux/slices/loginSlice';
import fireAjax from '../axios/api';
import ApiUrl from '../axios/url';

export default {
  async login(payload) {
    console.log(payload);
    return fireAjax({
      method: 'POST',
      URL: `${ApiUrl.userLogin}`,
      data: payload,
    });
  },
};

// export const login = payload => {
//   return async (dispatch, getState) => {
//     const token = getState().loginSlice.token;
//     try {
//       dispatch(updateLoading());
//       //api call
//       const res = fireAjax({method: 'POST', URL: `${API.Login}`, data});
//       if (res.data.state === 1) {
//         //other opp
//         //show massage
//         //loader distaptch
//       } else {
//         // loader status
//         // message
//       }
//     } catch (e) {
//       //error
//     }
//   };
// };
