import React, { useReducer, useContext, useEffect} from 'react';
import { Action, TaskContext, taskReducer } from './TaskContext';
import { DEFAULT_STATE } from '../shared/constants';
import { IInitialStateProps } from '../shared/interfaces';
import { getAllListApi, updateListsApi } from '../shared/api/api';
import { updateList } from './helper';

interface ProviderProps {
    children: React.ReactNode
}

function TaskProvider ({ children }: ProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(taskReducer, DEFAULT_STATE);

  useEffect(() => {
    async function fetchData (): Promise<void> {
      try {
        const response = await getAllListApi();
        dispatch(updateList(response));
      } catch (error) {
        throw new Error('Không tìm thấy dữ liệu');
      }
    }
    void fetchData();
  }, []);
  useEffect(() => {
    updateListsApi(state.list)
  }, [state.list]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTask = (): { state: IInitialStateProps, dispatch: React.Dispatch<Action> } => useContext(TaskContext);
export default TaskProvider;
