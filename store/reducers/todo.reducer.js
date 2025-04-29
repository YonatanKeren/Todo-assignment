import { todoService } from "../../services/todo.service.js"

const { createStore } = Redux

// Todo
export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODP'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_DONE_TODOS_PERCENT = 'SET_DONE_TODOS_PERCENT'
export const SET_MAX_PAGE = 'SET_MAX_PAGE'


const initialState = {
    todos: [],
    prevTodos: [],
    isLoading: false,
    filterBy: todoService.getDefaultFilter(),
    isCartShown: false,
    shoppingCart: []
}

export function todoReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_TODOS:
            return {
                ...state,
                todos: [...cmd.todos]
            }
        case REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo._id !== cmd.todoId)
            }
        case ADD_TODO:
            return {
                ...state,
                todos: [cmd.todo, ...state.todos]
            }
        case UPDATE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo => (todo._id === cmd.todo._id) ? cmd.car : todo)
            }
        case SET_DONE_TODOS_PERCENT:
            return {
                ...state,
                doneTodosPercent: cmd.doneTodosPercent
            }
        case SET_MAX_PAGE:
            return {
                ...state,
                maxPage: cmd.maxPage
            }
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: cmd.isLoading
            }

        default: return state
    }
}