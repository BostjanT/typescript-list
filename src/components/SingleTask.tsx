import React from 'react';
import { Status } from '../constants/user-enum';
import Tasks from './Tasks';

interface SingleTaskProps {}
const SingleTask = () => {
    
  const setTaskEdit = (id: string) => {
    const task = tasks.find((task: Tasks) => task.id === id);
    if (task) {
      setNewTask(task.description);
      setTitle(task.title);
      setTaskId(task.id);
    }
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task: Tasks) => task.id !== id));
  };

  const doneTask = (id: string) => {
    const done = tasks.find((task: Tasks) => task.id === id);
    if (done) done.isDone = !done.isDone;
    setTasks([...tasks]);
  };
  return (
    <div className='task_display' key={task.id}>
      <h4 className={Status.DONE ? 'done' : ''}>{task.title}</h4>
      <p>{task.description}</p>
      <h4>{task.priority}</h4>
      <div className='buttons'>
        <button
          className={Status.DONE ? 'done' : 'btn_ngen'}
          onClick={() => setTaskEdit(task.id)}>
          EDIT
        </button>
        <button onClick={() => deleteTask(task.id)}>DELETE</button>
        <button onClick={() => doneTask(task.id)}>
          {Status.DONE ? 'UNDO' : 'DONE'}
        </button>
      </div>
    </div>
  );
};

export default SingleTask;
