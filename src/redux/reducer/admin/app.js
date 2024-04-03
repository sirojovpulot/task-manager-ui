import {UPDATE_STATE} from "../../constants/admin/index.js";


const initState = {
    tasks: [],
    loadingTaskCreate: false,
    openTaskCreateModal: false,
    pagination: {total: 0, pageSize: 0, current: 0},
    filter: {title: '', content: '', status: null, priority: null, category: '', startDate: null, endDate: null},

};


const adminReducer = (state = initState, action) => {
    switch (action.type) {
        case UPDATE_STATE:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}


export default adminReducer;
