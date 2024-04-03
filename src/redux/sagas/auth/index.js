import {all, call, fork, put, takeEvery} from "redux-saga/effects";

import history from "../../../history.js";
import {updateAuthState} from "../../actions/index.js";
import {ACCESS_TOKEN} from "../../../config/constants.js";
import service from '../../../config/FetchInterceptor.js';
import {GET_USER_ME, POST_SIGNIN, POST_SIGNUP} from "../../constants/auth";
import {notification} from "antd";


function* callLogin() {
    yield takeEvery(POST_SIGNIN, function* ({payload}) {
        try {
            const {data: {access_token}} = yield call(service, {
                method: 'post',
                url: `api/v1/auth/sign-in`,
                data: {
                    ...payload.data
                }
            });
            localStorage.setItem(ACCESS_TOKEN, access_token);
            history.push('/');
            window.location.reload();
        } catch (error) {
            console.log(error);
        } finally {
            yield put(updateAuthState({submitBtnLoading: false}));
        }
    });
}

function* callSignUp() {
    yield takeEvery(POST_SIGNUP, function* ({payload}) {
        try {
            const {success, message} = yield call(service, {
                method: 'post',
                url: `api/v1/auth/sign-up`,
                data: {
                    ...payload.data
                }
            });
            if (success) {
                notification.success(message);
                history.push('/');
            }
        } catch (error) {
            console.log(error);
        } finally {
            yield put(updateAuthState({submitBtnLoading: false}));
        }
    });
}

function* callGetUserMe() {
    yield takeEvery(GET_USER_ME, function* ({payload}) {
        try {
            const {data} = yield call(service, {
                method: 'get',
                url: `api/v1/user/me`
            });

            yield put(updateAuthState({userMe: data}));
        } catch (error) {
            console.log(error);
        } finally {
            yield put(updateAuthState({meLoading: false}));
        }
    });
}


export default function* rootSaga() {
    yield all([
        fork(callLogin),
        fork(callSignUp),
        fork(callGetUserMe),
    ]);
};