import { useState } from 'react';
import Logo from '../assets/images/logo.png';

import Pagination from './Pagination/Pagination';

type Tasks = {
  id: string;
  title: string;
  description: string;
  status: string /* {
    new: boolean;
    done: boolean;
    onHold: boolean;
    pending: boolean;
  } */;
  priority: string /* {
    low: boolean;
    medium: boolean;
    high: boolean;
  } */;
  date: string;
  add: string;
};

const Tasks = () => {
  const [status, setStatus] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const setTaskEdit = (id: string) => {
    const task = tasks.find((task: Tasks) => task.id === id);
    if (task) {
      setNewTask(task.description);
      setTitle(task.title);
      setTaskId(task.id);
    }
  };

  const editTask = () => {
    const edTask = tasks.find((task: Tasks) => task.id === taskId);
    if (edTask) {
      edTask.description = newTask;
      edTask.title = title;
      setTasks([...tasks]);
      setTaskId('');
    }
    setNewTask('');
    setTitle('');
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task: Tasks) => task.id !== id));
  };

  const doneTask = (id: string) => {
    const done = tasks.find((task: Tasks) => task.id === id);
    if (done) done.isDone = !done.isDone;
    setTasks([...tasks]);
  };

  // Get current posts
  const indexOfLastTask = currentPage * postsPerPage;
  const indexOfFirstTask = indexOfLastTask - postsPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <section className='bg_black'>
      <div className='container-fluid'>
        <div className='row'>
          <img src={Logo} alt='' className='img-fluid image' />
        </div>
        <h1 className='text-center mb-5'>TASK LIST</h1>

        <div>
          {currentTasks.map((task: Tasks) => {
            return (
              <div className='task_display' key={task.id}>
                <h4 className={task.status.done ? 'done' : ''}>{task.title}</h4>
                <p>{task.description}</p>
                <h4>{task.priority}</h4>
                <div className='buttons'>
                  <button
                    className={task.status.done ? 'done' : 'btn_ngen'}
                    onClick={() => setTaskEdit(task.id)}>
                    EDIT
                  </button>
                  <button onClick={() => deleteTask(task.id)}>DELETE</button>
                  <button onClick={() => doneTask(task.id)}>
                    {task.status.done ? 'UNDO' : 'DONE'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Pagination
        totalPosts={tasks.length}
        postsPerPage={postsPerPage}
        paginate={paginate}
      />
    </section>
  );
};

export default Tasks;
