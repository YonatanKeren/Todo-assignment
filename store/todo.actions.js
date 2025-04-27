import { todoService } from "../services/todo.service.js"
import { ADD_TODO, REMOVE_TODO, SET_TODOS, SET_IS_LOADING, store, UPDATE_TODO } from "./store.js"


export function loadTodos(filterBy) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    return todoService.query(filterBy)
        .then(todos => {
            store.dispatch({ type: SET_TODOS, todos })
        })
        .catch(err => {
            console.log('Cannot load todos', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

export function removeTodo(todoId) {

    return todoService.remove(todoId)
        .then(() => {
            store.dispatch({ type: REMOVE_TODO, todoId })
        })
        .catch(err => {
            console.log('Cannot load cars', err)
            throw err
        })
}

export function saveTodo(todoToSave) {
    const type = todoToSave._id ? UPDATE_TODO : ADD_TODO

    return todoService.save(todoToSave)
        .then(savedTodo => {
            store.dispatch({ type, todo: savedTodo })
            return savedTodo
        })
        .catch(err => {
            console.log('Cannot load todos', err)
            throw err
        })
}

export function toggleTodo(todo) {
        const todoToSave = { ...todo, isDone: !todo.isDone }

        return todoService.save(todoToSave)
            .then((savedTodo) => {
                // setTodos(prevTodos => prevTodos.map(currTodo => (currTodo._id !== todo._id) ? currTodo : { ...savedTodo }))
                dispatch({type:UPDATE_TODO, todo})
                showSuccessMsg(`Todo is ${(savedTodo.isDone)? 'done' : 'back on your list'}`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot toggle todo ' + todoId)
            })
    }