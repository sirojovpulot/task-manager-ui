import {all, call, fork, put, takeEvery} from "redux-saga/effects";

import * as types from '../../../constants/library';
import service from '../../../../config/FetchInterceptor.js';
import {getLibraryCategoryKadr, updateLibraryState} from "../../../actions/library";



function* callGetCategoryKadr() {
    yield takeEvery(types.GET_LIBRARY_CATEGORY_KADR, function* ({payload}) {
        try {
            const {data} = yield call(service, {
                method: 'get',
                url: `/api/v1/report/kadr/` + payload.reportId,
                params: payload?.params
            });

            yield put(updateLibraryState({categoryKadr: data}));
        } catch (error) {
            console.log(error);
        } finally {
            // off loading
        }
    });
}

function* callPostCategoryKadr() {
    yield takeEvery(types.POST_LIBRARY_CATEGORY_KADR, function* ({payload}) {
        try {
            yield call(service, {
                method: 'post',
                url: `/api/v1/report/kadr`,
                data: payload.data
            });
            yield put(getLibraryCategoryKadr({reportId: payload.data.reportId}));
            yield put(updateLibraryState({isEditCategoryKadr: false}));
        } catch (error) {
            console.log(error);
        } finally {
            // off loading
            yield put(updateLibraryState({isSaveCategoryKadr: false}));
        }
    });
}



export default function* rootSaga() {
    yield all([
        fork(callGetCategoryKadr),
        fork(callPostCategoryKadr)
    ]);
};