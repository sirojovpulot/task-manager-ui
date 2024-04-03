import {all, call, fork, put, takeEvery} from "redux-saga/effects";

import * as types from '../../constants/library';
import service from '../../../config/FetchInterceptor.js';
import {updateLibraryState} from "../../actions/library";



function* callGetReportByPeriodId() {
    yield takeEvery(types.GET_REPORTS_BY_PERIOD_ID, function* ({payload}) {
        try {
            const {data} = yield call(service, {
                method: 'get',
                url: `/api/v1/report/` + payload.periodId,
                params: payload?.params
            });

            yield put(updateLibraryState({libraryReport: data}));
        } catch (error) {
            console.log(error);
        } finally {
            // off loading
        }
    });
}



export default function* rootSaga() {
    yield all([
        fork(callGetReportByPeriodId),
    ]);
};