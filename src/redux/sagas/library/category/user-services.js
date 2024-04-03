import {all, call, fork, put, takeEvery} from "redux-saga/effects";

import * as types from '../../../constants/library';
import service from '../../../../config/FetchInterceptor.js';
import {getLibraryCategoryUserServices, updateLibraryState} from "../../../actions/library";



function* callGetLibraryUserServices() {
    yield takeEvery(types.GET_LIBRARY_CATEGORY_USER_SERVICES, function* ({payload}) {
        try {
            const {data} = yield call(service, {
                method: 'get',
                url: `/api/v1/report/user-service/` + payload.reportId,
                params: payload?.params
            });

            yield put(updateLibraryState({categoryUserServices: data}));
        } catch (error) {
            console.log(error);
        } finally {
            // off loading
        }
    });
}

function* callPostLibraryUserServices() {
    yield takeEvery(types.POST_LIBRARY_CATEGORY_USER_SERVICES, function* ({payload}) {
        try {
            yield call(service, {
                method: 'post',
                url: `/api/v1/report/user-service`,
                data: payload.data
            });
            yield put(getLibraryCategoryUserServices({reportId: payload.data.reportId}));
            yield put(updateLibraryState({isEditCategoryUserServices: false}));
        } catch (error) {
            console.log(error);
        } finally {
            // off loading
            yield put(updateLibraryState({isSaveCategoryUserServices: false}));
        }
    });
}



export default function* rootSaga() {
    yield all([
        fork(callGetLibraryUserServices),
        fork(callPostLibraryUserServices)
    ]);
};