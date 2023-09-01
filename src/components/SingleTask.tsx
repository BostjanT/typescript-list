import { Status } from '../constants/user-enum';
import { Task } from '../constants/task-type';

interface Props {
  task: Task;
  onEditTaskClick: (task: Task) => void;
  onDeleteTaskClick: (id: any) => void;
}

const SingleTask = (props: Props) => {
  const dateFormat = () => {
    const date = new Date(props.task.date);
    const formatedDate = date.toLocaleDateString('uk-UK');
    return formatedDate;
  };
  return (
    <div className='container task_list my-3' key={props.task.id}>
      <div className='row my-3 align-items-center'>
        <div className='col-sm-6 '>
          <h4 className='task__title'>{props.task.title}</h4>
          <p>{props.task.description}</p>
        </div>
        <div className='col-sm-6 mx-auto task__buttons'>
          <button
            className={props.task.status === 'Done' ? 'disable' : 'btn-status'}
            onClick={() => props.onEditTaskClick(props.task)}>
            {/* onClick={() => setTaskEdit(props.task.id)} */}
            EDIT
          </button>
          <button
            className='btn-status'
            onClick={() => props.onDeleteTaskClick(props.task.id)}>
            DELETE
          </button>
        </div>
      </div>
      <div className='row bg-infos status__layout'>
        <div className='col-sm-4 '>
          <p>Task status: </p>
          <h5>
            {props.task.status}
            {props.task.status === 'Done' ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='26'
                height='26'
                fill='#5eba47'
                className='bi bi-check-circle ms-3'
                viewBox='0 0 16 16'>
                <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                <path d='M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z' />
              </svg>
            ) : (
              ''
            )}
          </h5>
        </div>
        <div className='col-sm-4'>
          <p>Task priority:</p>
          <h5>{props.task.priority}</h5>
        </div>
        <div className='col-sm-4 '>
          <p>Due date:</p>
          <h5>{dateFormat()}</h5>
        </div>
      </div>
    </div>
  );
};

export default SingleTask;
