import Task from '../Task/Task'


interface ITaskProps {
    task: string[]
    id: number
    isDragging: boolean
    handleDragging: (dragging: boolean) => void
    handleUpdate: (deleteBoardId: number, taskData: string, newBoardId: number, taskId: number) => void
}

function TaskList({ task, id, isDragging, handleDragging, handleUpdate }: ITaskProps) {
    return (
        <div
            className={`layout-cards ${isDragging ? 'layout-dragging' : ''}`}
        >
            {task.map((taskItem: string, index: number) => {
                return (
                    <Task key={index} taskItem={taskItem} handleDragging={handleDragging} id={id} taskId={index} handleUpdate={handleUpdate} />
                )
            })}
        </div>
    )
}

export default TaskList