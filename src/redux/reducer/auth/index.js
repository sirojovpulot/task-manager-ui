import {UPDATE_AUTH_STATE} from "../../constants/auth/index.js";



const initState = {
    userMe: {},
    meLoading: false,
    submitBtnLoading: false
};



const FetchedAuth = (state = initState, action) => {
    switch (action.type) {
        case UPDATE_AUTH_STATE:
            return {
                ...state,
                ...action.payload
            }
        default: return state;
    }
}



export default FetchedAuth;
