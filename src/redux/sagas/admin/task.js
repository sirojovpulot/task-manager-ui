import {all, call, fork, put, select, takeEvery} from "redux-saga/effects";

import {getAllTasks, updateAdminState} from "../../actions/admin";
import service from '../../../config/FetchInterceptor.js';
import {DELETE_TASK, GET_ALL_TASKS, POST_TASK, PUT_TASK} from "../../constants/admin";
import {notification} from "antd";


function* callGetAllTasks() {
    yield takeEvery(GET_ALL_TASKS, function* ({payload}) {
        try {
            const {data} = yield call(service, {
                method: 'get',
                url: `api/v1/task`,
                params: payload
            });
            yield put(updateAdminState({tasks: data}));
            yield put(updateAdminState({
                pagination: {
                    total: data?.totalElements,
                    pageSize: data?.size,
                    current: data?.number + 1
                }
            }));
        } catch (error) {
            console.log(error);
        } finally {
            // off loading
        }
    });
}

function* callPostTask() {
    yield takeEvery(POST_TASK, function* ({payload}) {
        try {
            const {pagination, filter} = yield select(state => state.admin);
            yield put(updateAdminState({loadingTaskCreate: true}));
            const {success} = yield call(service, {
                method: 'post',
                url: `api/v1/task`,
                data: {...payload}
            });
            if (success) {
                yield put(updateAdminState({openTaskCreateModal: false}));
                yield put(getAllTasks({
                    page: pagination.current - 1,
                    size: pagination.pageSize,
                    ...filter
                }));
            } else {
                notification.error("Error occured");
            }
        } catch (error) {
            console.log(error);
        } finally {
            yield put(updateAdminState({loadingTaskCreate: false}));
        }
    });
}

function* callPutTask() {
    yield takeEvery(PUT_TASK, function* ({payload}) {
        try {
            const {pagination, filter} = yield select(state => state.admin);
            const {success} = yield call(service, {
                method: 'put',
                url: `api/v1/task/${payload.id}/status`,
                data: {...payload}
            });
            if (success) {
                yield put(getAllTasks({
                    page: pagination.current - 1,
                    size: pagination.pageSize,
                    ...filter
                }));
            } else {
                notification.error("Error occured");
            }
        } catch (error) {
            console.log(error);
        } finally {
        }
    });
}

function* callDeleteTask() {
    yield takeEvery(DELETE_TASK, function* ({payload}) {
        try {
            const {pagination, filter} = yield select(state => state.admin);
            const {success} = yield call(service, {
                method: 'delete',
                url: `api/v1/task/${payload}`,
                data: {...payload}
            });
            if (success) {
                yield put(getAllTasks({
                    page: pagination.current - 1,
                    size: pagination.pageSize,
                    ...filter
                }));
            } else {
                notification.error("Error occured");
            }
        } catch (error) {
            console.log(error);
        } finally {
        }
    });
}


export default function* rootSaga() {
    yield all([
        fork(callGetAllTasks),
        fork(callPostTask),
        fork(callPutTask),
        fork(callDeleteTask),
    ]);
};