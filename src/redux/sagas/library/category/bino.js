import {all, call, fork, put, takeEvery} from "redux-saga/effects";

import * as types from '../../../constants/library';
import service from '../../../../config/FetchInterceptor.js';
import {getLibraryCategoryBino, updateLibraryState} from "../../../actions/library";



function* callGetLibraryBino() {
    yield takeEvery(types.GET_LIBRARY_CATEGORY_BINO, function* ({payload}) {
        try {
            const {data} = yield call(service, {
                method: 'get',
                url: `/api/v1/report/bino/` + payload.reportId,
                params: payload?.params
            });

            yield put(updateLibraryState({categoryBino: data}));
        } catch (error) {
            console.log(error);
        } finally {
            // off loading
        }
    });
}

function* callPostLibraryBino() {
    yield takeEvery(types.POST_LIBRARY_CATEGORY_BINO, function* ({payload}) {
        try {
            yield call(service, {
                method: 'post',
                url: `/api/v1/report/bino`,
                data: payload.data
            });
            yield put(getLibraryCategoryBino({reportId: payload.data.reportId}));
            yield put(updateLibraryState({isEditCategoryBino: false}));
        } catch (error) {
            console.log(error);
        } finally {
            // off loading
            yield put(updateLibraryState({isSaveCategoryBino: false}));
        }
    });
}



export default function* rootSaga() {
    yield all([
        fork(callGetLibraryBino),
        fork(callPostLibraryBino)
    ]);
};