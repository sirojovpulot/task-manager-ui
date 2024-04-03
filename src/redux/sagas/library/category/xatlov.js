import {all, call, fork, put, takeEvery} from "redux-saga/effects";

import * as types from '../../../constants/library';
import service from '../../../../config/FetchInterceptor.js';
import {getLibraryCategoryXatlov, updateLibraryState} from "../../../actions/library";



function* callGetLibraryXatlov() {
    yield takeEvery(types.GET_LIBRARY_CATEGORY_XATLOV, function* ({payload}) {
        try {
            const {data} = yield call(service, {
                method: 'get',
                url: `/api/v1/report/xatlov/` + payload.reportId,
                params: payload?.params
            });

            yield put(updateLibraryState({categoryXatlov: data?.map(i => ({...i, writable: true}))}));
        } catch (error) {
            console.log(error);
        } finally {
            // off loading
        }
    });
}

function* callPostLibraryXatlov() {
    yield takeEvery(types.POST_LIBRARY_CATEGORY_XATLOV, function* ({payload}) {
        try {
            yield call(service, {
                method: 'post',
                url: `/api/v1/report/xatlov`,
                data: payload.data
            });
            yield put(getLibraryCategoryXatlov({reportId: payload.data.reportId}));
            yield put(updateLibraryState({isEditCategoryXatlov: false}));
        } catch (error) {
            console.log(error);
        } finally {
            // off loading
            yield put(updateLibraryState({isSaveCategoryXatlov: false}));
        }
    });
}



export default function* rootSaga() {
    yield all([
        fork(callGetLibraryXatlov),
        fork(callPostLibraryXatlov)
    ]);
};