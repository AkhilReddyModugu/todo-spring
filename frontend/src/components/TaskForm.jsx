import React, { useState } from 'react';
import { createTask } from '../services/taskService';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setLoading(true);
    try {
      await createTask({ title, description, completed: false });
      setTitle('');
      setDescription('');
      window.location.reload();
    } catch (error) {
      console.error('Failed to add task:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Add new task form"
      className="mb-5"
    >
      <div className="mb-3">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control form-control-lg shadow-sm"
          disabled={loading}
          aria-required="true"
          required
        />
      </div>
      <div className="mb-3">
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="form-control form-control-lg shadow-sm"
          disabled={loading}
          aria-required="true"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary btn-lg w-100 shadow"
      >
        {loading ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;
