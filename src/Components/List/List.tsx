import { useState } from 'react'
import TaskList from '../TaskList/TaskList'
import { useTask } from '../../dataContext/TaskProvider'
import { addNewTask, changeTitle, deleteList } from '../../dataContext/helper'
import styles from './List.module.css';
import { ListProps } from '../../shared/interfaces';

interface IListProps {
    item: ListProps
    isDragging: boolean
    handleDragging: (dragging: boolean) => void
    handleUpdate: (deleteBoardId: number, taskData: string, newBoardId: number, taskId: number, position: string) => void
}

function List({ item, isDragging, handleDragging, handleUpdate }: IListProps) {
    const { dispatch } = useTask()

    const [task, setNewTask] = useState('')
    const [newName, setNewName] = useState(item.title)
    const [edit, setEdit] = useState(false)
    function handleAddNewTask(event: any) {
        setNewTask(event.target.value)
    }

    function newTask() {
        setNewTask('')
        dispatch(addNewTask({ id: item.id, task: task }));
    }

    function deleteBoard() {
        dispatch(deleteList({id: item.id}))
    }

    function handleNameChange() {
        setEdit((edit) => !edit)
    }

    function handleNameText(event: any) {
        setNewName(event.target.value)
    }

    function handleSaveNewTitle() {
        setEdit(false)
        dispatch(changeTitle({id: item.id, newTitle: newName}))
    }
    function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
        item.taskList.length === 0 && event.preventDefault()
    }
    function handleDrop(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        const data = event.dataTransfer.getData('card').split('-');
        if (item.taskList.length === 0 && data[0] !== '') {
            handleUpdate(Number(data[1]), data[0], item.id, -1, 'default');
        }
        handleDragging(false);
    }  

    return (
        <div 
            className={styles.list}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {
                edit ? (
                    <div className={styles.titleEdit}>
                        <input type={'text'} value={newName} onChange={(event) => handleNameText(event)} />
                        <button disabled={newName.length === 0} onClick={handleSaveNewTitle} className='save-title'>Save Title</button>
                    </div>
                ) : (
                    <>
                        <h3 onClick={handleNameChange}>
                            {item.title}
                        </h3>
                    </>
                )
            }
            <div>
                <TaskList
                    id={item.id} 
                    task={item.taskList} 
                    isDragging={isDragging}
                    handleDragging={handleDragging}
                    handleUpdate={handleUpdate}
                />
            </div>
            <div className={styles.newTask}>
                <input value={task} placeholder='Add a new task...' type={'text'} onChange={(event) => handleAddNewTask(event)} style={{ padding: '8px', border: 'none', borderRadius: '8px' }} />
                <button disabled={task.trim().length === 0} style={{ marginLeft: 'auto', fontSize: '15px' }} onClick={newTask}><i className="bi bi-plus-lg"></i></button>
            </div>
            <div className={styles.deleteListContainer}>
                <span className={styles.deleteList} onClick={deleteBoard}>
                <i className="bi bi-trash"></i>
                </span>
            </div>
            
        </div >
    )
}

export default List