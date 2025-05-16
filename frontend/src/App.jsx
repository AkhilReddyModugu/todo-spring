import React, { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { getTasks } from './services/taskService';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div
      className="min-vh-100 d-flex flex-column justify-content-center align-items-center"
      style={{
        background: 'linear-gradient(90deg, #e0e7ff, #d6bcfa, #fbb6ce)',
        padding: '2rem',
      }}
    >
      <div className="bg-white rounded-4 shadow-lg p-5" style={{ maxWidth: '600px', width: '100%' }}>
        <h1 className="text-primary fw-bold text-center mb-4">My To-Do List</h1>
        <TaskForm />
        {loading ? (
          <p className="text-center text-primary fw-semibold">Loading tasks...</p>
        ) : (
          <TaskList tasks={tasks} refreshTasks={fetchTasks} />
        )}
      </div>
    </div>
  );
};

export default App;
