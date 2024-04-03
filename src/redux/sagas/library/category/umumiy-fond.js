import {all, call, fork, put, takeEvery} from "redux-saga/effects";

import * as types from '../../../constants/library';
import service from '../../../../config/FetchInterceptor.js';
import {getLibraryCategoryUmumiyFond, updateLibraryState} from "../../../actions/library";



function* callGetLibraryCategoryUmumiyFond() {
    yield takeEvery(types.GET_LIBRARY_UMUMIY_FOND, function* ({payload}) {
        try {
            const {data} = yield call(service, {
                method: 'get',
                url: `/api/v1/report/umumiy-fond/` + payload.reportId,
                params: payload?.params
            });

            yield put(updateLibraryState({libraryCategoryUmumiyFond: data}));
        } catch (error) {
            console.log(error);
        } finally {
            // off loading
        }
    });
}

function* callPostLibraryCategoryUmumiyFond() {
    yield takeEvery(types.POST_LIBRARY_CATEGORY_UMUMIY_FOND, function* ({payload}) {
        try {
            yield call(service, {
                method: 'post',
                url: `/api/v1/report/umumiy-fond`,
                data: payload.data
            });
            yield put(getLibraryCategoryUmumiyFond({reportId: payload.data.reportId}));
            yield put(updateLibraryState({isEditLibraryCategoryUmumiyFond: false}));
        } catch (error) {
            console.log(error);
        } finally {
            // off loading
            yield put(updateLibraryState({isSaveLibraryCategoryUmumiyFondLoading: false}));
        }
    });
}



export default function* rootSaga() {
    yield all([
        fork(callGetLibraryCategoryUmumiyFond),
        fork(callPostLibraryCategoryUmumiyFond)
    ]);
};