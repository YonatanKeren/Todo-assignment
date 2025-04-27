import { TodoPreview } from "./TodoPreview.jsx"
const { Link } = ReactRouterDOM
const { useState } = React

export function TodoList({ todos, onRemoveTodo, onToggleTodo }) {

    const [isRemoving, setIsRemoving] = useState(false)
    const [todoId, setTodoId] = useState(null)

    function openRemoveModal(todoId) {
        setIsRemoving(true)
        setTodoId(todoId)
    }

    function confirmRemove(id) {
        todoId ? onRemoveTodo(id) : null
        setTimeout(() => {
            setIsRemoving(false)
        }, 280)
    }

    return (
        <div>
            <ul className="todo-list">
                {todos.map(todo =>
                    <li key={todo._id}
                    style={{ backgroundColor: todo.color || "#99a695" }}>
                        <TodoPreview todo={todo} onToggleTodo={() => onToggleTodo(todo)} />
                        <section>
                            <button onClick={() => {
                                openRemoveModal(todo._id)
                            }}>Remove</button>
                            <button><Link to={`/todo/${todo._id}`}>Details</Link></button>
                            <button><Link to={`/todo/edit/${todo._id}`}>Edit</Link></button>
                        </section>
                    </li>
                )}
            </ul>

            {isRemoving && (
                <div className="remove-modal">
                    <h3>Are you sure you want to remove this todo?</h3>
                    <div>
                        <button onClick={() => confirmRemove(todoId)}>Yes</button>
                        <button onClick={() => setIsRemoving(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    )
}