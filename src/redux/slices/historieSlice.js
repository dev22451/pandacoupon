import { createSlice } from '@reduxjs/toolkit';
import { ApiService } from '../../api'; false
import { Toast } from 'native-base';

const historieSlice = createSlice({
    name: 'histories',
    initialState: {
        redeemUserCoupon:[],
        isLoading: false,
        isError: false,
        errorMessage: '',
        page:1,
        totalpages:1,
    },
    reducers: {
        getRedeemCouponbyUserRequested: (state, action) => {
            state.isLoading = true;
            state.errorMessage = '';
            state.isError = false;
        },
        getRedeemCouponbyUserSuccessful: (state, action) => {
            state.isLoading = false;
            state.redeemUserCoupon = action.payload.redeemUserCoupon;
            state.totalpages = action.payload.totalpages;
        },
        getRedeemCouponbyUserFailed: (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.errorMessage;
            state.isError = true;
        },
        updateRedeemCouponbyUserRequested: (state, action) => {
            state.isLoading = true;
            state.errorMessage = '';
            state.isError = false;
        },
        updateRedeemCouponbyUserSuccessful: (state, action) => {
            state.isLoading = false;
            state.redeemUserCoupon = state.redeemUserCoupon.concat(action.payload.redeemUserCoupon);
            state.page =state.page+1;
        },
        updateRedeemCouponbyUserFailed: (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.errorMessage;
            state.isError = true;
        },
    }
});

export const {
    getRedeemCouponbyUserRequested,
    getRedeemCouponbyUserSuccessful,
    getRedeemCouponbyUserFailed,
    updateRedeemCouponbyUserRequested,
    updateRedeemCouponbyUserSuccessful,
    updateRedeemCouponbyUserFailed,
} = historieSlice.actions;

export default historieSlice.reducer;

export const getredeemCouponbyUser = (userEmail,page,limit) => {
    return async (dispatch, getState) => {
        dispatch(getRedeemCouponbyUserRequested());
        const { token } = getState().loginSlice;
        //const { page } =getState().historieSlice;
        //console.log(page);
        try {
            const payload = {
                token,
            };
            const res = await ApiService.redeemCouponbyUser(userEmail,page,limit);

            if (res.data.success) {
                dispatch(
                    getRedeemCouponbyUserSuccessful({
                        totalpages: res.data.totalPages,
                        redeemUserCoupon: res.data.data,
                    }),
                );
            }
        } catch (e) {
            dispatch(
                getRedeemCouponbyUserFailed({
                    errorMessage: e?.response?.data?.errors || 'Something went wrong',
                }),
            );
        }
    };
};

export const updateredeemCouponbyUser = (userEmail,page) => {
    return async (dispatch, getState) => {
        console.log(page,'hdfuh');
        dispatch(updateRedeemCouponbyUserRequested());
        const { token } = getState().loginSlice;
        try {
            const payload = {
                token,
            };
            const res = await ApiService.redeemCouponbyUser(userEmail, page, token);

            if (res.data.success) {
                dispatch(
                    updateRedeemCouponbyUserSuccessful({
                        redeemUserCoupon: res.data.data,
                    }),
                );
            }
        } catch (e) {
            dispatch(
                updateRedeemCouponbyUserFailed({
                    errorMessage: e?.response?.data?.errors || 'Something went wrong',
                }),
            );
        }
    };
};
