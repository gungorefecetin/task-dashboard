// src/components/TaskBoard.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';
import { fetchTasks, updateTask } from '../redux/taskSlice';

const TaskBoard = () => {
  const dispatch = useDispatch();
  const { items: tasks, status, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    // Only fetch tasks if the current status is idle.
    if (status === 'idle') {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // If no destination, do nothing.
    if (!destination) return;

    // If dropped in the same place, do nothing.
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    // Find the task being dragged.
    const task = tasks.find((t) => String(t.id) === draggableId);
    if (task) {
      // Update the task's status to match the destination column.
      dispatch(updateTask({ ...task, status: destination.droppableId }));
    }
  };

  if (status === 'loading') {
    return <div>Loading tasks...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="task-board">
        <Column
          title="To Do"
          tasks={tasks.filter((task) => task.status === 'todo')}
          columnId="todo"
        />
        <Column
          title="In Progress"
          tasks={tasks.filter((task) => task.status === 'inprogress')}
          columnId="inprogress"
        />
        <Column
          title="Done"
          tasks={tasks.filter((task) => task.status === 'done')}
          columnId="done"
        />
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
