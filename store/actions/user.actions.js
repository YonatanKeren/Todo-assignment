import { userService } from "../../services/user.service.js";
import { SET_USER, SET_USER_SCORE} from "../reducers/user.reducer.js";
import { store } from "../store.js"


export function login(credentials) {

    return userService.login(credentials)
        .then((loggedinUser) => {
            store.dispatch({ type: SET_USER, loggedinUser })
        })
        .catch(err => {
            console.log('Cannot login', err)
            throw err
        })

}

export function signup(credentials) {

    return userService.signup(credentials)
        .then((loggedinUser) => {
            store.dispatch({ type: SET_USER, loggedinUser })
        })
        .catch(err => {
            console.log('Cannot signup', err)
            throw err
        })

}

export function logout() {

    return userService.logout()
        .then(() => {
            store.dispatch({ type: SET_USER, loggedinUser: null })
        })
        .catch(err => {
            console.log('Cannot logout', err)
            throw err
        })

}

export function checkout(diff) {

    return userService.updateScore(diff)
        .then(score => {
            store.dispatch({ type: SET_USER_SCORE, score })
            store.dispatch({ type: CLEAR_CART })
            store.dispatch({ type: TOGGLE_CART_IS_SHOWN })
        })
        .catch(err => {
            console.log('Cannot logout', err)
            throw err
        })

}
