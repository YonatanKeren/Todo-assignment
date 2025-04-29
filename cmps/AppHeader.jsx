const { useState } = React
const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter
const { useSelector } = ReactRedux

import { userService } from '../services/user.service.js'
import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'
import { TodosProgress } from './TodosProgress.jsx'


export function AppHeader() {

    const todos = useSelector(state => state.todoModule.todos)
    const doneTodosPercent = useSelector((storeState) => storeState.todoModule.doneTodosPercent)
    const navigate = useNavigate()
    const [user, setUser] = useState(userService.getLoggedinUser())

    function onLogout() {
        userService.logout()
            .then(() => {
                onSetUser(null)
            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }

    function onSetUser(user) {
        setUser(user)
        navigate('/')
    }

    const doneTodos = todos.filter(todo => todo.isDone).length
    const progress = todos.length > 0 ? (doneTodos / todos.length) * 100 : 0


    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Todo App</h1>
                {todos &&
                    <TodosProgress doneTodosPercent={doneTodosPercent} />
                }
                {user ? (
                    < section >
                        <Link to={`/user/${user._id}`}>Hello {user.fullname}</Link>
                        <button onClick={onLogout}>Logout</button>
                    </ section >
                ) : (
                    <section>
                        <LoginSignup onSetUser={onSetUser} />
                    </section>
                )}
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/todo" >Todos</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                </nav>
            </section>
            <UserMsg />
        </header>
    )
}
