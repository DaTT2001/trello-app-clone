import { axiosClient } from './config';
import { ListProps } from '../interfaces';

export async function getAllListApi (): Promise<ListProps[]> {
    const response = await axiosClient.get('api/lists');
    return response.data;
}
export async function addNewListApi (list: ListProps): Promise<ListProps[]> {
    const response = await axiosClient.post('api/lists');
    return response.data;
}
export async function updateListsApi (lists: ListProps[]): Promise<ListProps[]> {
    const response = await axiosClient.put('api/lists',lists);
    return response.data;
}