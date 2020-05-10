import { USER_LOGGEDIN, LOGOUT_USER } from "../actions/types";

const INITIAL_STATE = null;

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOGOUT_USER:
            return INITIAL_STATE;
        case USER_LOGGEDIN:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}
