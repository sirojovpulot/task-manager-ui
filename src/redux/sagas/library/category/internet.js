import {all, call, fork, put, takeEvery} from "redux-saga/effects";

import * as types from '../../../constants/library';
import service from '../../../../config/FetchInterceptor.js';
import {getLibraryCategoryInternet, updateLibraryState} from "../../../actions/library";



function* callGetLibraryInternet() {
    yield takeEvery(types.GET_LIBRARY_CATEGORY_INTERNET, function* ({payload}) {
        try {
            const {data} = yield call(service, {
                method: 'get',
                url: `/api/v1/report/internet/` + payload.reportId,
                params: payload?.params
            });

            yield put(updateLibraryState({categoryInternet: data}));
        } catch (error) {
            console.log(error);
        } finally {
            // off loading
        }
    });
}

function* callPostLibraryInternet() {
    yield takeEvery(types.POST_LIBRARY_CATEGORY_INTERNET, function* ({payload}) {
        try {
            yield call(service, {
                method: 'post',
                url: `/api/v1/report/internet`,
                data: payload.data
            });
            yield put(getLibraryCategoryInternet({reportId: payload.data.reportId}));
            yield put(updateLibraryState({isEditCategoryInternet: false}));
        } catch (error) {
            console.log(error);
        } finally {
            // off loading
            yield put(updateLibraryState({isSaveCategoryInternet: false}));
        }
    });
}



export default function* rootSaga() {
    yield all([
        fork(callGetLibraryInternet),
        fork(callPostLibraryInternet)
    ]);
};