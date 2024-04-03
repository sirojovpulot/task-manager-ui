import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import adminReducer from "../reducer/admin/app.js";
import authReducer from "../reducer/auth/index.js";


const sagaMiddleware = createSagaMiddleware();


const store = configureStore({
    reducer: {
        admin: adminReducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
});


sagaMiddleware.run(rootSaga);

export default store;