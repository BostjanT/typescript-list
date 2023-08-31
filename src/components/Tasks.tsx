import { useState } from 'react';
import Logo from '../assets/images/logo.png';

import Pagination from './Pagination/Pagination';
import AddTaskForm from './AddTaskForm';
import SingleTask from './SingleTask';
import { Task } from '../constants/task-type';
import EditTaskForm from './EditTaskForm';

const Tasks = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [editedTask, setEditedTask] = useState<Task | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  function orderFirst(a: any, b: any) {
    return a - b;
  }
  function orderLatest(a: any, b: any) {
    return b - a;
  }

  const showFirst = () => {
    taskList.sort(orderFirst);
  };
  const showLast = () => {
    taskList.sort(orderLatest);
  };

  // Get current posts
  const indexOfLastTask = currentPage * postsPerPage;
  const indexOfFirstTask = indexOfLastTask - postsPerPage;
  const currentTasks = taskList.slice(indexOfFirstTask, indexOfLastTask);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <section className='bg_black'>
      <div className='container-fluid'>
        <div className='row'>
          <img src={Logo} alt='' className='img-fluid image' />
        </div>
        <h1 className='text-center mb-5'>TASK LIST</h1>
        {editedTask === null ? (
          <AddTaskForm
            addTask={(task) => {
              setTaskList([...taskList, task]);
            }}
          />
        ) : (
          <EditTaskForm
            editTask={(task) => {
              const foundTask = taskList.find((taskL) => taskL.id === task.id);
              if (foundTask) {
                setEditedTask(foundTask);
                setTaskList([...taskList, foundTask]);
              }
            }}
          />
        )}
        <div className='container'>
          <button className='btn_ngen' onClick={() => showFirst()}>
            Show first
          </button>
          <button className='btn_ngen' onClick={() => showLast()}>
            Show Last
          </button>
        </div>
        <div>
          {currentTasks.map((task: Task) => {
            return <SingleTask task={task} />;
          })}
        </div>
      </div>
      <Pagination
        totalPosts={taskList.length}
        postsPerPage={postsPerPage}
        paginate={paginate}
      />
    </section>
  );
};

export default Tasks;
