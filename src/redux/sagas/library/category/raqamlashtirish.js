import {all, call, fork, put, takeEvery} from "redux-saga/effects";

import * as types from '../../../constants/library';
import service from '../../../../config/FetchInterceptor.js';
import {getLibraryCategoryRaqamlashtirish, updateLibraryState} from "../../../actions/library";



function* callGetCategoryRaqamlashtirish() {
    yield takeEvery(types.GET_LIBRARY_CATEGORY_RAQAMLASHTIRISH, function* ({payload}) {
        try {
            const {data} = yield call(service, {
                method: 'get',
                url: `/api/v1/report/raqamlashtirish/` + payload.reportId,
                params: payload?.params
            });

            yield put(updateLibraryState({categoryRaqamlashtirish: data}));
        } catch (error) {
            console.log(error);
        } finally {
            // off loading
        }
    });
}

function* callPostCategoryRaqamlashtirish() {
    yield takeEvery(types.POST_LIBRARY_CATEGORY_RAQAMLASHTIRISH, function* ({payload}) {
        try {
            yield call(service, {
                method: 'post',
                url: `/api/v1/report/raqamlashtirish`,
                data: payload.data
            });
            yield put(getLibraryCategoryRaqamlashtirish({reportId: payload.data.reportId}));
            yield put(updateLibraryState({isEditCategoryRaqamlashtirish: false}));
        } catch (error) {
            console.log(error);
        } finally {
            // off loading
            yield put(updateLibraryState({isSaveCategoryRaqamlashtirish: false}));
        }
    });
}



export default function* rootSaga() {
    yield all([
        fork(callGetCategoryRaqamlashtirish),
        fork(callPostCategoryRaqamlashtirish)
    ]);
};