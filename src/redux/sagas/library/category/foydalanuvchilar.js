import {all, call, fork, put, takeEvery} from "redux-saga/effects";

import * as types from '../../../constants/library';
import service from '../../../../config/FetchInterceptor.js';
import {getLibraryCategoryFoydalanuvchilar, updateLibraryState} from "../../../actions/library";



function* callGetCategoryFoydalanuvchilar() {
    yield takeEvery(types.GET_LIBRARY_CATEGORY_FOYDALANUVCHILAR, function* ({payload}) {
        try {
            const {data} = yield call(service, {
                method: 'get',
                url: `/api/v1/report/users/` + payload.reportId,
                params: payload?.params
            });

            yield put(updateLibraryState({categoryFoydalanuvchilar: data}));
        } catch (error) {
            console.log(error);
        } finally {
            // off loading
        }
    });
}

function* callPostCategoryFoydalanuvchilar() {
    yield takeEvery(types.POST_LIBRARY_CATEGORY_FOYDALANUVCHILAR, function* ({payload}) {
        try {
            yield call(service, {
                method: 'post',
                url: `/api/v1/report/users`,
                data: payload.data
            });
            yield put(getLibraryCategoryFoydalanuvchilar({reportId: payload.data.reportId}));
            yield put(updateLibraryState({isEditCategoryFoydalanuvchilar: false}));
        } catch (error) {
            console.log(error);
        } finally {
            // off loading
            yield put(updateLibraryState({isSaveCategoryFoydalanuvchilar: false}));
        }
    });
}



export default function* rootSaga() {
    yield all([
        fork(callGetCategoryFoydalanuvchilar),
        fork(callPostCategoryFoydalanuvchilar)
    ]);
};