import {all, call, fork, put, takeEvery} from "redux-saga/effects";

import * as types from '../../../constants/library';
import service from '../../../../config/FetchInterceptor.js';
import {getLibraryCategoryTadbir, updateLibraryState} from "../../../actions/library";



function* callGetLibraryTadbir() {
    yield takeEvery(types.GET_LIBRARY_CATEGORY_TADBIR, function* ({payload}) {
        try {
            const {data} = yield call(service, {
                method: 'get',
                url: `/api/v1/report/tadbir/` + payload.reportId,
                params: payload?.params
            });

            yield put(updateLibraryState({categoryTadbir: data}));
        } catch (error) {
            console.log(error);
        } finally {
            // off loading
        }
    });
}

function* callPostLibraryTadbir() {
    yield takeEvery(types.POST_LIBRARY_CATEGORY_TADBIR, function* ({payload}) {
        try {
            yield call(service, {
                method: 'post',
                url: `/api/v1/report/tadbir`,
                data: payload.data
            });
            yield put(getLibraryCategoryTadbir({reportId: payload.data.reportId}));
            yield put(updateLibraryState({isEditCategoryTadbir: false}));
        } catch (error) {
            console.log(error);
        } finally {
            // off loading
            yield put(updateLibraryState({isSaveCategoryTadbir: false}));
        }
    });
}



export default function* rootSaga() {
    yield all([
        fork(callGetLibraryTadbir),
        fork(callPostLibraryTadbir)
    ]);
};