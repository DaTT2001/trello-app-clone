import { useState } from 'react'
import { useTask } from '../../dataContext/TaskProvider';
import { addNewList } from '../../dataContext/helper';
import styles from './Addlist.module.css';

function AddList() {
    const {dispatch} = useTask();

    const [title, setTitle] = useState('')
    const [taskName, setTaskName] = useState('')
    const [taskList, setTasks] = useState<any[]>([])

    function handleTitle(event: any) {
        setTitle(event.target.value)
    }
    function handleTaskName(event: any) {
        setTaskName(event?.target.value)
    }
    function handleTask() {
        setTasks((prev: any) => [...prev, taskName])
        setTaskName('')
    }
    function saveList() {
        const dataObj = {
            title: title,
            taskList: taskList,
            id: Date.now()
        }
        dispatch(addNewList(dataObj))
        setTitle('')
        setTasks([])
    }
    return (
        <div className={styles.addList}>
            <input value={title} type={'text'} onChange={(event) => handleTitle(event)} placeholder={'Add title..'} />
            {
                taskList.map((task) => {
                    return (<div className={styles.demoTask}>{task}</div>)
                })
            }
            <div className={styles.taskName}>
                <div><input placeholder='Add task..' value={taskName} type={'text'} onChange={(event) => handleTaskName(event)}/></div>
                <div className={styles.saveTask}><button onClick={handleTask} disabled={taskName.length === 0} >Save Task</button></div>
            </div>
            <button disabled={taskList.length === 0 || title.length === 0} onClick={saveList} >Save List</button>
        </div>
    )
}

export default AddList