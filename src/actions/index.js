import {
    USER_LOGGEDIN,
    LOGOUT_USER
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
