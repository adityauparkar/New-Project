import {
    USER_LOGGEDIN,
    LOGOUT_USER,
    UPDATE_RESULT,
    CLEAR_RESULT
} from "./types";


export function login(data) {
    return {
        type: USER_LOGGEDIN,
        payload: data
    };
}
export function logout() {
    return {
        type: LOGOUT_USER
    };
}

export function updateResult(data) {
    return {
        type: UPDATE_RESULT,
        payload: data
    };
}

export function clearResult() {
    return {
        type: CLEAR_RESULT
    };
}

