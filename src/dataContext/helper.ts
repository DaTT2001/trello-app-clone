import { ListProps } from "../shared/interfaces"
import { Action } from "./TaskContext"

export const addNewList = (payload: {title: string, taskList: string[], id: number}): Action => {
    return {
        type: 'ADD_NEW_LIST',
        payload
    }
}

export const addNewTask = (payload: {id: number, task: string}): Action => {
    return {
        type: 'ADD_NEW_TASK',
        payload
    }
}

export const editTask = (payload: {prevTask: string, newTask: string, id: number}): Action => {
    return {
        type: 'EDIT_TASK_NAME',
        payload
    }
}

export const deleteTask = (payload: {taskItem: string, id: number}): Action => {
    return {
        type: 'DELETE_TASK',
        payload
    }
}

export const deleteList = (payload: {id: number}): Action => {
    return {
        type: 'DELETE_LIST',
        payload
    }
}

export const changeTitle = (payload: {id: number, newTitle: string}): Action => {
    return {
        type: 'CHANGE_TITLE',
        payload
    }
}

export const dragDrop = (payload: {removeBoardId: number, addBoardId: number, taskData: string, taskId: number, position: string }): Action => {
    return {
        type: 'DRAG_DROP',
        payload
    }
}

export const updateList = (payload: ListProps[]): Action => {
    return {
        type: 'UPDATE_LIST',
        payload
    }
}