import { userService } from "../../services/user.service.js"

const { createStore } = Redux

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const CHANGE_BY = 'CHANGE_BY'

// User
export const SET_USER = 'SET_USER'
export const SET_USER_SCORE = 'SET_USER_SCORE'


const initialState = {
    count: 100,
    loggedinUser: userService.getLoggedinUser(),
}

export function userReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case INCREMENT:
            return {
                ...state,
                count: state.count + 1
            }
        case DECREMENT:
            return {
                ...state,
                count: state.count - 1
            }
        case CHANGE_BY:
            return {
                ...state,
                count: state.count + cmd.diff
            }
        case SET_USER:
            return {
                ...state,
                loggedinUser: cmd.loggedinUser
            }
        case SET_USER_SCORE:
            return {
                ...state,
                loggedinUser: { ...state.loggedinUser, score: cmd.score }
            }

        default: return state
    }
}