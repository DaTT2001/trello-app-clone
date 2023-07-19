import Task from '../Task/Task';
import styles from './TaskList.module.css';

interface ITaskListProps {
    task: string[]
    id: number
    isDragging: boolean
    handleDragging: (dragging: boolean) => void
    handleUpdate: (deleteBoardId: number, taskData: string, newBoardId: number, taskId: number, position: string) => void
}

function TaskList({ task, id, isDragging, handleDragging, handleUpdate }: ITaskListProps) {
    return (
        <div
            className={styles.layoutCard}
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