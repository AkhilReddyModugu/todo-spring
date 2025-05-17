import React, { useState } from 'react';
import { deleteTask, updateTask } from '../services/taskService';

const TaskItem = ({ task, refreshTasks }) => {
  const [editMode, setEditMode] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const formattedDate = new Date(task.createdAt).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleUpdate = async () => {
    if (!editedTitle.trim() || !editedDescription.trim()) return;
    setUpdating(true);
    try {
      await updateTask(task.id, {
        ...task,
        title: editedTitle,
        description: editedDescription,
      });
      setEditMode(false);
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

  const toggleCompleted = async () => {
    try {
      await updateTask(task.id, { ...task, completed: !task.completed });
      refreshTasks();
    } catch (error) {
      console.error('Error toggling task status:', error);
    }
  };

  return (
    <li className="card mb-3 shadow-sm">
      <div className="card-body">
        <div className="form-check mb-2">
          <input
            type="checkbox"
            className="form-check-input"
            checked={task.completed}
            onChange={toggleCompleted}
            disabled={editMode}
            id={`task-check-${task.id}`}
          />
          <label
            className="form-check-label"
            htmlFor={`task-check-${task.id}`}
          >
            {editMode ? (
              <input
                type="text"
                className="form-control mt-2"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                disabled={updating}
              />
            ) : (
              <span
                className={`ms-2 ${task.completed ? 'text-decoration-line-through text-muted' : ''}`}
              >
                {task.title}
              </span>
            )}
          </label>
        </div>

        {editMode ? (
          <textarea
            className="form-control mb-2"
            rows={3}
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            disabled={updating}
          />
        ) : (
          <p className={`card-text ${task.completed ? 'text-muted' : ''}`}>
            {task.description}
          </p>
        )}

        <div className="d-flex justify-content-between align-items-center mt-3">
          <small className="text-muted">Created: {formattedDate}</small>
          <div>
            {editMode ? (
              <>
                <button
                  className="btn btn-sm btn-success me-2"
                  onClick={handleUpdate}
                  disabled={updating}
                >
                  {updating ? 'Saving...' : 'Save'}
                </button>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => setEditMode(true)}
                >
                  Update
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default TaskItem;
