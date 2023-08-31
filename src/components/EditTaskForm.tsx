import { useState, ChangeEvent } from 'react';
import { Priority, Status } from '../constants/user-enum';

import { Task } from '../constants/task-type';
interface TaskFormProps {
  editTask: (task: Task) => void;
  editedTask: Task;
}

const AddTaskForm = (props: TaskFormProps) => {
  const [title, setTitle] = useState(props.editedTask.title);
  const [newTask, setNewTask] = useState(props.editedTask.description);
  const [taskId, setTaskId] = useState(props.editedTask.id);
  const [addFile, setAddFile] = useState<File>();
  const [status, setStatus] = useState<Status>(
    props.editedTask.status as Status
  );
  const [priorities, setPriorities] = useState<Priority>(
    props.editedTask.priority as Priority
  );
  const [date, setDate] = useState('');

  const handleAddFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAddFile(e.target.files[0]);
    }
  };

  const handleRadio = (e: ChangeEvent<HTMLInputElement>) => {
    setPriorities(e.target.value as Priority);
  };

  const handleStatusRadio = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value as Status);
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
      <div className='row'>
        <div className='col-12 col-sm-4 mb-3'>
          <label htmlFor='startDate'>Due date</label>
          <input
            id='startDate'
            className='form-control styled_input'
            type='date'
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>
      {/* PRIORITIES RADIO */}
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
                checked={priorities === Priority.LOW}
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
                checked={priorities === Priority.MEDIUM}
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
                checked={priorities === Priority.HIGH}
                onChange={handleRadio}
              />
              <label className='form-check-label' htmlFor='high'>
                High
              </label>
            </div>
          </div>
        </div>
      </fieldset>
      {/*  STATUS RADIOS */}
      <fieldset className='form-group'>
        <div className='row mb-3'>
          <legend className='col-form-label col-sm-2 pt-0'>Status</legend>
          <div className='col-sm-10'>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='gridRadios'
                id='new'
                value='New'
                checked={status === Status.NEW}
                onChange={handleStatusRadio}
              />
              <label className='form-check-label' htmlFor='new'>
                New
              </label>
            </div>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='gridRadios'
                id='done'
                value='Done'
                checked={status === Status.DONE}
                onChange={handleStatusRadio}
              />
              <label className='form-check-label' htmlFor='done'>
                Done
              </label>
            </div>
            <div className='form-check '>
              <input
                className='form-check-input'
                type='radio'
                name='gridRadios'
                id='onhold'
                value='OnHold'
                checked={status === Status.onHOLD}
                onChange={handleStatusRadio}
              />
              <label className='form-check-label' htmlFor='onhold'>
                On Hold
              </label>
            </div>
            <div className='form-check '>
              <input
                className='form-check-input'
                type='radio'
                name='gridRadios'
                id='pending'
                value='Pending'
                checked={status === Status.PENDING}
                onChange={handleStatusRadio}
              />
              <label className='form-check-label' htmlFor='pending'>
                Pending
              </label>
            </div>
          </div>
        </div>
      </fieldset>
      <div className='col-sm-6 mb-3'>
        <input
          className='form-control styled_input'
          type='file'
          name='attach'
          id='formFile'
          onChange={handleAddFile}
        />
      </div>
      <div className='form-group row'>
        <div className='col-sm-10'>
          <button
            className='btn_ngen'
            type='submit'
            onClick={(e) => {
              e.preventDefault();
              props.editTask({
                id: props.editedTask.id,
                title: title,
                description: newTask,
                status: status,
                priority: priorities as string,
                date: date,
                add: '',
              });
            }}>
            {taskId === '' ? 'Add Task' : 'Edit Task'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddTaskForm;
