import {all, call, fork, put, takeEvery} from "redux-saga/effects";

import * as types from '../../../constants/library';
import service from '../../../../config/FetchInterceptor.js';
import {getLibraryCategoryDataMoney, updateLibraryState} from "../../../actions/library";



function* callGetLibraryDataMoney() {
    yield takeEvery(types.GET_LIBRARY_CATEGORY_DATA_MONEY, function* ({payload}) {
        try {
            const {data} = yield call(service, {
                method: 'get',
                url: `/api/v1/report/data-money/` + payload.reportId,
                params: payload?.params
            });

            yield put(updateLibraryState({categoryDataMoney: data}));
        } catch (error) {
            console.log(error);
        } finally {
            // off loading
        }
    });
}

function* callPostLibraryDataMoney() {
    yield takeEvery(types.POST_LIBRARY_CATEGORY_DATA_MONEY, function* ({payload}) {
        try {
            yield call(service, {
                method: 'post',
                url: `/api/v1/report/data-money`,
                data: payload.data
            });
            yield put(getLibraryCategoryDataMoney({reportId: payload.data.reportId}));
            yield put(updateLibraryState({isEditCategoryDataMoney: false}));
        } catch (error) {
            console.log(error);
        } finally {
            // off loading
            yield put(updateLibraryState({isSaveCategoryDataMoney: false}));
        }
    });
}



export default function* rootSaga() {
    yield all([
        fork(callGetLibraryDataMoney),
        fork(callPostLibraryDataMoney)
    ]);
};