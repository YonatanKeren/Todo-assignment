import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { PaginationBtns } from "../cmps/PaginationBtns.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { todoService } from "../services/todo.service.js"
import { REMOVE_TODO, SET_TODOS, UPDATE_TODO } from "../store/reducers/todo.reducer.js"
import { loadTodos, removeTodo, saveTodo, toggleTodo } from "../store/actions/todo.actions.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"


const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

const { useSelector, useDispatch } = ReactRedux

export function TodoIndex() {

    const todos = useSelector(storeState => storeState.todoModule.todos)
    const maxPage = useSelector(storeState => storeState.todoModule.maxPage)


    const dispatch = useDispatch()

    // Special hook for accessing search-params:
    const [searchParams, setSearchParams] = useSearchParams()

    const defaultFilter = todoService.getFilterFromSearchParams(searchParams)

    const [filterBy, setFilterBy] = useState(defaultFilter)

    useEffect(() => {
        setSearchParams(filterBy)
        loadTodos(filterBy)
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load todos')
            })
    }, [filterBy])

    function onRemoveTodo(todoId) {
        removeTodo(todoId)
            .then(() => {
                showSuccessMsg(`Todo removed`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot remove todo ' + todoId)
            })
    }

    function onToggleTodo(todo) {
        toggleTodo(todo)
            .then((savedTodo) => {
                showSuccessMsg(`Todo is ${(savedTodo.isDone)? 'done' : 'back on your list'}`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot toggle todo ' + todoId)
            })
    }

    function onSetFilterBy(filterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }

    function onChangePageIdx(diff) {
        let newPageIdx = +filterBy.pageIdx + diff
        if (newPageIdx < 0) newPageIdx = maxPage - 1
        if (newPageIdx >= maxPage) newPageIdx = 0
        onSetFilterBy({ pageIdx: newPageIdx })
    }


    const { importance, status, pageIdx, sort, txt } = filterBy

    if (!todos) return <div>Loading...</div>
    return (
        <section className="todo-index">
            <TodoFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
            <div>
                <Link to="/todo/edit" className="btn" >Add Todo</Link>
            </div>
            <h2>Todos List</h2>
            <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo}/>
            {/* <hr />
            <h2>Todos Table</h2>
            <div style={{ width: '60%', margin: 'auto' }}>
                <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
            </div> */}
            <PaginationBtns filterBy={{ pageIdx }} onChangePageIdx={onChangePageIdx} />
        </section>
    )
}