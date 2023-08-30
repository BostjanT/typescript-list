import { useState } from 'react';
import Logo from '../assets/images/logo.png';

import Pagination from './Pagination/Pagination';
import AddTaskForm from './AddTaskForm';
import SingleTask from './SingleTask';

type Tasks = {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  date: string;
  add: string;
};

const Tasks = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

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
        <AddTaskForm
        /* title={title}
          setTitle={setTitle}
          newTask={newTask}
          setNewTask={setNewTask}
          addTask={addTask}
          editTask={editTask}
          taskId={taskId}
          handleRadio={handleRadio}
          handleAddFile={handleAddFile} */
        />
        <div>
          {currentTasks.map((task: Tasks) => {
            return <SingleTask />;
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
