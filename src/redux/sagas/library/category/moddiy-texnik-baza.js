import {all, call, fork, put, takeEvery} from "redux-saga/effects";

import * as types from '../../../constants/library';
import service from '../../../../config/FetchInterceptor.js';
import {getLibraryCategoryModdiyTexnikBaza, updateLibraryState} from "../../../actions/library";



function* callGetLibrarymModdiyTexnikBaza() {
    yield takeEvery(types.GET_LIBRARY_CATEGORY_MODDIY_TEXNIK_BAZA, function* ({payload}) {
        try {
            const {data} = yield call(service, {
                method: 'get',
                url: `/api/v1/report/moddiy-texnik-baza/` + payload.reportId,
                params: payload?.params
            });

            yield put(updateLibraryState({categoryModdiyTexnikBaza: data}));
        } catch (error) {
            console.log(error);
        } finally {
            // off loading
        }
    });
}

function* callPostLibrarymModdiyTexnikBaza() {
    yield takeEvery(types.POST_LIBRARY_CATEGORY_MODDIY_TEXNIK_BAZA, function* ({payload}) {
        try {
            yield call(service, {
                method: 'post',
                url: `/api/v1/report/moddiy-texnik-baza`,
                data: payload.data
            });
            yield put(getLibraryCategoryModdiyTexnikBaza({reportId: payload.data.reportId}));
            yield put(updateLibraryState({isEditCategoryModdiyTexnikBaza: false}));
        } catch (error) {
            console.log(error);
        } finally {
            // off loading
            yield put(updateLibraryState({isSaveCategoryModdiyTexnikBaza: false}));
        }
    });
}



export default function* rootSaga() {
    yield all([
        fork(callGetLibrarymModdiyTexnikBaza),
        fork(callPostLibrarymModdiyTexnikBaza)
    ]);
};