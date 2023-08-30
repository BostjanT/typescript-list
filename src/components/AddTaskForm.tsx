import React, { ChangeEvent, useState } from 'react';
import { nanoid } from 'nanoid';

const AddTaskForm = () => {
  const [tasks, setTasks] = useState([] as any);
  const [title, setTitle] = useState('');
  const [newTask, setNewTask] = useState('');
  const [taskId, setTaskId] = useState('');
  const [addFile, setAddFile] = useState<File>();
  const [priorities, setPriorities] = useState<String>();

  const addTask = () => {
    if (newTask === '') return;
    setTasks([
      ...tasks,
      {
        id: nanoid(),
        title: title,
        description: newTask,
        status: status,
        priority: priorities,
        date: new Date(),
      },
    ]);
    setTitle('');
    setNewTask('');
  };

  const handleAddFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAddFile(e.target.files[0]);
    }
  };

  const handleRadio = (e: ChangeEvent<HTMLInputElement>) => {
    setPriorities(e.target.value);
  };
  return (
    <form className='container glass p-5'>
      <div className='form-group row align-items-center  mb-3'>
        <label htmlFor='title' className='col-sm-2'>
          Title
        </label>
        <input
          className='styled_input col-sm-10'
          type='text'
          name='title'
          id='title'
          value={title}
          placeholder='Add task title here...'
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className='form-group row align-items-center mb-3'>
        <label htmlFor='title' className='col-sm-2'>
          Task description
        </label>
        <input
          className='styled_input col-sm-10'
          type='text'
          name='task'
          value={newTask}
          placeholder='Enter your task here...'
          onChange={(e) => setNewTask(e.target.value)}
        />
      </div>
      <fieldset className='form-group'>
        <div className='row mb-3'>
          <legend className='col-form-label col-sm-2 pt-0'>Priorities</legend>
          <div className='col-sm-10'>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='gridRadios'
                id='low'
                value='Low'
                onChange={handleRadio}
              />
              <label className='form-check-label' htmlFor='low'>
                Low
              </label>
            </div>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='gridRadios'
                id='medium'
                value='Medium'
                onChange={handleRadio}
              />
              <label className='form-check-label' htmlFor='medium'>
                Medium
              </label>
            </div>
            <div className='form-check '>
              <input
                className='form-check-input'
                type='radio'
                name='gridRadios'
                id='high'
                value='High'
                onChange={handleRadio}
              />
              <label className='form-check-label' htmlFor='high'>
                High
              </label>
            </div>
          </div>
        </div>
      </fieldset>
      <input
        className='form-control-file mb-3'
        type='file'
        name='attach'
        onChange={handleAddFile}
      />
      <div className='form-group row'>
        <div className='col-sm-10'>
          <button
            className='btn_ngen'
            type='submit'
            onClick={() => (taskId === '' ? addTask() : editTask())}>
            {taskId === '' ? 'Add Task' : 'Edit Task'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddTaskForm;