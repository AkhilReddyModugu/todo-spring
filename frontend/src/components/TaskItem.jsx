import React, { useState } from 'react';
import { deleteTask, updateTask } from '../services/taskService';

const TaskItem = ({ task, refreshTasks }) => {
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const formattedDate = new Date(task.createdAt).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const toggleComplete = async () => {
    setUpdating(true);
    try {
      await updateTask(task.id, { ...task, completed: !task.completed });
      refreshTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    setDeleting(true);
    try {
      await deleteTask(task.id);
      refreshTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <li
      className={`list-group-item rounded shadow-sm mb-3 ${
        task.completed ? 'bg-light text-decoration-line-through text-muted' : ''
      }`}
      aria-label={`Task: ${task.title}`}
    >
      <div
        onClick={toggleComplete}
        role="checkbox"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && toggleComplete()}
        aria-checked={task.completed}
        className={`d-flex flex-column cursor-pointer ${updating ? 'opacity-50' : ''}`}
        style={{ userSelect: 'none' }}
      >
        <h5 className="mb-1">{task.title}</h5>
        <p className="mb-2" style={{ whiteSpace: 'pre-wrap' }}>{task.description}</p>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-2">
        <small className="text-muted fst-italic">Created: {formattedDate}</small>
        <button
          onClick={handleDelete}
          disabled={deleting}
          aria-label={`Delete task: ${task.title}`}
          className="btn btn-sm btn-outline-danger"
        >
          {deleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
