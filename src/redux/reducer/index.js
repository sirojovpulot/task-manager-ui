import adminReducer from './admin/app.js';
import libraryReducer from './library/index.js';
import authReducer from './auth/index.js';


const reducers = {
    admin: adminReducer,
    auth: authReducer
};


export default reducers;