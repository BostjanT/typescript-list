import { Status } from '../constants/user-enum';
import { Task } from '../constants/task-type';

interface Props {
  task: Task;
}
const SingleTask = (props: Props) => {
  /*  const setTaskEdit = (id: string) => {
    const task = props.task.find((task: Task) => task.id === id);
    if (task) {
      props.setNewTask(task.description);
      props.setTitle(task.title);
      props.setTaskId(task.id);
    }
  };

  const deleteTask = (id: string) => {
    setTasks(props.task.filter((task: Task) => task.id !== id));
  };

  const doneTask = (id: string) => {
    const done = props.task.find((task: Task) => task.id === id);
    if (done) done.isDone = !done.isDone;
    setTasks([...tasks]);
  }; */

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
            className={Status.DONE ? 'done' : 'btn-status'}
            onClick={() => setTaskEdit(props.task.id)}>
            EDIT
          </button>
          <button
            className='btn-status'
            onClick={() => deleteTask(props.task.id)}>
            DELETE
          </button>
          {/*   <button
            className='btn-status'
            onClick={() => doneTask(props.task.id)}>
            {Status.DONE ? 'UNDO' : 'DONE'}
          </button> */}
        </div>
      </div>
      <div className='row bg-infos status__layout'>
        <div className='col-sm-4 '>
          <p>
            Task status: <h5>{props.task.status}</h5>
          </p>
        </div>
        <div className='col-sm-4'>
          <p>
            Task priority: <h5>{props.task.priority}</h5>
          </p>
        </div>
        <div className='col-sm-4 '>
          <p>
            Due date: <h5>{dateFormat()}</h5>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleTask;
