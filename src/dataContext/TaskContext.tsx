import { createContext } from "react";
import { IInitialStateProps, ListProps } from "../shared/interfaces";
import { DEFAULT_STATE } from "../shared/constants";

export type Action =
  | { type: "ADD_NEW_TASK"; payload: {id: number, task: string} }
  | { type: "EDIT_TASK_NAME"; payload: {prevTask: string, newTask: string, id: number} }
  | { type: "DELETE_TASK"; payload: {taskItem: string, id: number} }
  | { type: "DELETE_LIST"; payload: {id: number} }
  | { type: "CHANGE_TITLE"; payload: {id: number, newTitle: string} }
  | { type: "ADD_NEW_LIST"; payload: {title: string, taskList: string[], id: number} }
  | { type: "DRAG_DROP"; payload: {removeBoardId: number, addBoardId: number, taskItem: string, taskId: number} }
  | { type: "UPDATE_LIST"; payload: ListProps[] };

export const taskReducer = (state = DEFAULT_STATE, action: Action) => {
    switch(action.type) {
        case 'UPDATE_LIST' : {
            return {
                list: action.payload
            }
        }
        case 'ADD_NEW_LIST': {
            return {
                list: [...state.list, action.payload]
            }
        }
        case 'ADD_NEW_TASK': {
            let list = [...state.list]
            list.forEach((item: ListProps) => {
                if (item.id === action.payload.id) {
                    let newTaskList = [...item.taskList]
                    newTaskList.push(action.payload.task)
                    item['taskList'] = newTaskList
                }
            })
            return {
                list
            }
        }
        case 'EDIT_TASK_NAME': {
            let list = [...state.list]
            list.forEach((item: ListProps) => {
                if (item.id === action.payload.id) {
                    let newTaskList = [...item.taskList]
                    const index = newTaskList.indexOf(action.payload.prevTask)
                    if (index !== -1) {
                        newTaskList[index] = action.payload.newTask
                        item['taskList'] = newTaskList
                    }
                }
            })
            return {
                list
            } 
        }
        case 'DELETE_TASK': {
            let list = [...state.list]
            list.forEach((item: ListProps) => {
                if (item.id === action.payload.id) {
                    let newTaskList = [...item.taskList]
                    const index = newTaskList.indexOf(action.payload.taskItem)
                    if (index !== -1) {
                        newTaskList.splice(index, 1)
                        item['taskList'] = newTaskList
                    }
                }
            })
            return {
                list
            }
        }
        case 'DELETE_LIST': {
            let list = [...state.list]
            let key = 0
            list.forEach((item: ListProps, index: number) => {
                if (item.id === action.payload.id) {
                    key = index
                }
            })
            list.splice(key, 1)
            return {
                list
            }
        }
        case 'CHANGE_TITLE': {
            let list = [...state.list]
            list.forEach((item: ListProps) => {
                if (item.id === action.payload.id) {
                    item.title = action.payload.newTitle
                }
            })
            return {
                list
            }
        }
        case 'DRAG_DROP': {
            let list = [...state.list]
            list.forEach((item: ListProps) => {
                if (item.id === action.payload.removeBoardId) {
                    let newTaskList = [...item.taskList]
                    const index = newTaskList.indexOf(action.payload.taskItem)
                    if (index !== -1) {
                        newTaskList.splice(index, 1)
                        item['taskList'] = newTaskList
                    }
                }
            })
            list.forEach((item: ListProps) => {
                if (item.id === action.payload.addBoardId) {
                    let newTaskList = [...item.taskList]
                    
                    newTaskList.splice(action.payload.taskId, 0, action.payload.taskItem)
                    item['taskList'] = newTaskList
                }
            })
            return {
                list
            }
        }
        default: return state
    }
}

export const TaskContext = createContext<{
    state: IInitialStateProps;
    dispatch: React.Dispatch<Action>;
  }>({
    state: DEFAULT_STATE,
    dispatch: () => {},
  });