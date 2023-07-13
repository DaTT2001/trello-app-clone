import React, { useReducer, useContext} from 'react';
import { Action, TaskContext, taskReducer } from './TaskContext';
import { DEFAULT_STATE } from '../shared/constants';
import { IInitialStateProps } from '../shared/interfaces';

interface ProviderProps {
    children: React.ReactNode
}

function TaskProvider ({ children }: ProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(taskReducer, DEFAULT_STATE);
  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
export const useTask = (): { state: IInitialStateProps, dispatch: React.Dispatch<Action> } => useContext(TaskContext);
export default TaskProvider;
