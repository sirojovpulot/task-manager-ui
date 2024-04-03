import {all, call, fork, put, takeEvery} from "redux-saga/effects";

import * as types from '../../../constants/library';
import service from '../../../../config/FetchInterceptor.js';
import {getLibraryCategoryShtat, updateLibraryState} from "../../../actions/library";



function* callGetLibraryShtat() {
    yield takeEvery(types.GET_LIBRARY_CATEGORY_SHTAT, function* ({payload}) {
        try {
            const {data} = yield call(service, {
                method: 'get',
                url: `/api/v1/report/shtat/` + payload.reportId,
                params: payload?.params
            });

            yield put(updateLibraryState({categoryShtat: data}));
        } catch (error) {
            console.log(error);
        } finally {
            // off loading
        }
    });
}

function* callPostLibraryShtat() {
    yield takeEvery(types.POST_LIBRARY_CATEGORY_SHTAT, function* ({payload}) {
        try {
            yield call(service, {
                method: 'post',
                url: `/api/v1/report/shtat`,
                data: payload.data
            });
            yield put(getLibraryCategoryShtat({reportId: payload.data.reportId}));
            yield put(updateLibraryState({isEditCategoryShtat: false}));
        } catch (error) {
            console.log(error);
        } finally {
            // off loading
            yield put(updateLibraryState({isSaveCategoryShtat: false}));
        }
    });
}



export default function* rootSaga() {
    yield all([
        fork(callGetLibraryShtat),
        fork(callPostLibraryShtat)
    ]);
};