import React, { useState } from 'react'
import { useTask } from '../../dataContext/TaskProvider'
import { deleteTask, editTask } from '../../dataContext/helper'
import styles from './Task.module.css';

interface ITaskProps {
    taskItem: string
    id: number
    handleDragging: (dragging: boolean) => void
    handleUpdate: (deleteBoardId: number, taskData: string, newBoardId: number, taskId: number) => void
    taskId: number
}

function Task({taskItem, id, handleDragging, handleUpdate, taskId}: ITaskProps) {
    const {dispatch} = useTask()
    const [edit, setEdit] = useState<boolean>(false)
    const [editTaskName, setEditTaskName] = useState<string>('')
    
    function handleEdit(taskItem: string) {
        setEdit((edit) => !edit)
        setEditTaskName(taskItem)
    }

    function handleEditTaskName(event: any) {
        setEditTaskName(event.target.value)
    }

    function handleSave() {
        setEdit((edit) => !edit)
        dispatch(editTask({prevTask: taskItem, newTask: editTaskName, id: id}))
    }

    function handleDelete(taskItem: string) {
        dispatch(deleteTask({taskItem: taskItem, id: id}))
    }

    function handleDragEnd(event: React.DragEvent<HTMLDivElement>) {
        handleDragging(false)
    }

    function handleDragStart(event: React.DragEvent<HTMLDivElement>) {
        event.dataTransfer.setData('card', `${taskItem}-${id}`)
        handleDragging(true)
    }

    function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault()
    }

    function handleDrop(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault()
        const data = event.dataTransfer.getData('card').split('-')
        if(data[0] !== '') {
            handleUpdate(Number(data[1]), data[0], id, taskId)
        }
        handleDragging(false)
    }

    return (
        <div 
            className={styles.listItem}
            draggable={true} 
            onDragEnd={handleDragEnd} 
            onDragStart={(event) => handleDragStart(event)} 
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {
                edit ?
                    (
                        <>
                            <input style={{ padding: '8px', border: 'none', borderRadius: '5px' }} type={'text'} value={editTaskName} onChange={(event) => handleEditTaskName(event)} />
                            <div className={styles.taskAction}>
                                <button style={{backgroundColor: 'green'}} onClick={handleSave}>Save</button>
                            </div>
                        </>
                    )
                    :
                    (
                        <>
                            <span className={styles.taskItem}>{taskItem}</span>
                            <div className={styles.taskAction}>
                                <button onClick={() => handleEdit(taskItem)}><i className="bi bi-pencil"></i></button>
                                <button onClick={() => handleDelete(taskItem)}><i className="bi bi-trash"></i></button>
                            </div>
                        </>
                    )
            }
        </div>
    )
}

export default Task