import {all} from 'redux-saga/effects';

import auth from './auth/index.js';
import task from './admin/task.js';

export default function* rootSaga() {
    yield all([
        auth(),
        task()
    ]);
};