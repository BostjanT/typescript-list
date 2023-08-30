import { Dispatch } from 'react';

interface Props {
  setTitle: Dispatch<string>;
  setNewTask: Dispatch<string>;
  title: string;
  newTask: string;
  taskId: string;
  addTask: () => void;
  editTask: () => void;
  handleRadio: (e: any) => void;
  handleAddFile: (e: any) => void;
}

const AddTaskForm = (props: Props) => {
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
          value={props.title}
          placeholder='Add task title here...'
          onChange={(e) => props.setTitle(e.target.value)}
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
          value={props.newTask}
          placeholder='Enter your task here...'
          onChange={(e) => props.setNewTask(e.target.value)}
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
                onChange={props.handleRadio}
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
                onChange={props.handleRadio}
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
                onChange={props.handleRadio}
              />
              <label className='form-check-label' htmlFor='high'>
                High
              </label>
            </div>
          </div>
        </div>
      </fieldset>
      <div className='col-sm-10'>
        <input
          className='form-control-file mb-3'
          type='file'
          name='attach'
          onChange={props.handleAddFile}
        />
      </div>
      <div className='form-group row'>
        <div className='col-sm-10'>
          <button
            className='btn_ngen'
            type='submit'
            onClick={() =>
              props.taskId === '' ? props.addTask() : props.editTask()
            }>
            {props.taskId === '' ? 'Add Task' : 'Edit Task'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddTaskForm;
