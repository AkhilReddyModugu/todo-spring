import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, refreshTasks }) => {
  if (!tasks.length)
    return (
      <p className="text-center text-secondary mt-4 fs-5">
        No tasks available. Add one!
      </p>
    );

  return (
    <ul className="list-group">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} refreshTasks={refreshTasks} />
      ))}
    </ul>
  );
};

export default TaskList;
