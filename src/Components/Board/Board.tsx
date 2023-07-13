import { useEffect, useState } from 'react'
import AddList from '../AddList/AddList'
import List from '../List/List'
import { dragDrop, updateList } from '../../dataContext/helper'
import { useTask } from '../../dataContext/TaskProvider'
import styles from './Board.module.css';

function Board() {
    const {state, dispatch} = useTask()
    const [list, setList] = useState(state.list);
    const [addList, setAddList] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    
    function toggleAddlist() {
        setAddList((prevValue) => !prevValue)
    }

    function handleDragging(dragging: boolean) {
        setIsDragging(dragging)
    }

    function handleUpdate(removeBoardId: number, taskItem: string, addBoardId: number, taskId: number) {
        dispatch(dragDrop({removeBoardId: removeBoardId, addBoardId: addBoardId, taskItem: taskItem, taskId: taskId}))
    }
    
    useEffect(() => {
        setAddList(false)
        setList(state.list);
    }, [state.list])

    function handleListDrop(event: any, dropListId: any) {
        event.preventDefault();
        if(!isDragging) {
            const draggedListId = event.dataTransfer.getData('listId');
            if (draggedListId !== dropListId) {
              const updatedList = [...list];
              const draggedListIndex = updatedList.findIndex((item) => item.id === Number(draggedListId));
              const dropListIndex = updatedList.findIndex((item) => item.id === Number(dropListId));
              const draggedList = updatedList[draggedListIndex];
              updatedList.splice(draggedListIndex, 1);
              updatedList.splice(dropListIndex, 0, draggedList);
              setList(updatedList);
              dispatch(updateList(updatedList));
            }
        }
      }
    
      function handleListDragStart(event: any, listId: any) {
        event.dataTransfer.setData('listId', listId.toString());
      }

    return (
        <div className={styles.board}>
            {
                list.map((item: any) => {
                    return (
                        <div 
                            key={item.id}
                            className={styles.listWrapper}
                            onDragStart={(event) => handleListDragStart(event, item.id)}
                            onDragOver={(event) => event.preventDefault()}
                            onDrop={(event) => handleListDrop(event, item.id)}
                            draggable = {!isDragging}
                        >
                            <List
                                item={item}
                                isDragging={isDragging}
                                handleDragging={handleDragging}
                                handleUpdate={handleUpdate}
                            />
                        </div>
                        
                    )
                })
            }
            <div className={styles.addList}>
                {
                    addList ? (
                        <div>
                            <AddList />
                        </div>
                    ) : (
                        <div>
                            <button className={styles.addListBtn} onClick={toggleAddlist}>Thêm danh sách</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Board