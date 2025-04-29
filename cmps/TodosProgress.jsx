export function TodosProgress({ doneTodosPercent }) {
    return (
        <section className='progress-bar'>
            <progress value={doneTodosPercent} max="100"></progress>
            <p>{Math.round(doneTodosPercent)}%</p>
        </section>
    )
}