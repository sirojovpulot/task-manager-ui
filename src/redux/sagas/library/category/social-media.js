import {all, call, fork, put, takeEvery} from "redux-saga/effects";

import * as types from '../../../constants/library';
import service from '../../../../config/FetchInterceptor.js';
import {getLibraryCategorySocialMedia, updateLibraryState} from "../../../actions/library";



function* callGetLibrarySocialMedia() {
    yield takeEvery(types.GET_LIBRARY_CATEGORY_SOCIAL_MEDIA, function* ({payload}) {
        try {
            const {data} = yield call(service, {
                method: 'get',
                url: `/api/v1/report/social-media/` + payload.reportId,
                params: payload?.params
            });

            yield put(updateLibraryState({categorySocialMedia: data}));
        } catch (error) {
            console.log(error);
        } finally {
            // off loading
        }
    });
}

function* callPostLibrarySocialMedia() {
    yield takeEvery(types.POST_LIBRARY_CATEGORY_SOCIAL_MEDIA, function* ({payload}) {
        try {
            yield call(service, {
                method: 'post',
                url: `/api/v1/report/social-media`,
                data: payload.data
            });
            yield put(getLibraryCategorySocialMedia({reportId: payload.data.reportId}));
            yield put(updateLibraryState({isEditCategorySocialMedia: false}));
        } catch (error) {
            console.log(error);
        } finally {
            // off loading
            yield put(updateLibraryState({isSaveCategorySocialMedia: false}));
        }
    });
}



export default function* rootSaga() {
    yield all([
        fork(callGetLibrarySocialMedia),
        fork(callPostLibrarySocialMedia)
    ]);
};