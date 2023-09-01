import { useState } from 'react';
import Logo from '../assets/images/logo.png';

import Pagination from './Pagination/Pagination';
import AddTaskForm from './AddTaskForm';
import SingleTask from './SingleTask';
import { Task } from '../constants/task-type';
import EditTaskForm from './EditTaskForm';
import { Priority, Status } from '../constants/user-enum';

const Tasks = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [editedTask, setEditedTask] = useState<Task | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [filterStatus, setFilterStatus] = useState<Task[]>([]);
  const [filterPriority, setFilterPriority] = useState<Task[]>([]);

  const [showStatus, setShowStatus] = useState(false);
  const [showPriority, setShowPriority] = useState(false);

  const filterByStatus = (status: Status) => {
    const filtered = taskList.filter((task) => task.status === status);
    setFilterStatus(filtered);
  };

  const filterByPriority = (priority: Priority) => {
    const filteredStatus = taskList.filter(
      (task) => task.priority === priority
    );
    setFilterPriority(filteredStatus);
  };

  const resetEditedTask = () => {
    setEditedTask(null);
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
        <div className='row '>
          <img src={Logo} alt='' className='img-fluid image' />
        </div>
        <h1 className='text-center text-bold mb-3 goTop'>TASK LIST</h1>
        {!editedTask ? (
          <AddTaskForm
            addTask={(task) => {
              setTaskList([...taskList, task]);
            }}
          />
        ) : (
          <EditTaskForm
            editTask={(task) => {
              setTaskList(
                taskList.map((taskInList) => {
                  if (taskInList.id === task.id) {
                    return { ...task };
                  } else {
                    return taskInList;
                  }
                })
              );
            }}
            editedTask={editedTask}
            resetEditedTask={resetEditedTask}
          />
        )}
        {taskList.length > 0 ? (
          <div className='container my-2 p-3 glass  fadeIn'>
            <div className='row'>
              <div className='col-sm-6'>
                <h5 className='text-dark'>Filter by Status</h5>

                <button
                  className='btn_ngen_filter me-2'
                  onClick={() => {
                    setShowStatus((prev) => !prev);
                    filterByStatus(Status.NEW);
                  }}>
                  Show New
                </button>
                <button
                  className='btn_ngen_filter me-2'
                  onClick={() => {
                    setShowStatus((prev) => !prev);
                    filterByStatus(Status.PENDING);
                  }}>
                  Show Pending
                </button>
                <button
                  className='btn_ngen_filter me-2'
                  onClick={() => {
                    setShowStatus((prev) => !prev);
                    filterByStatus(Status.onHOLD);
                  }}>
                  Show on Hold
                </button>
                <button
                  className='btn_ngen_filter me-2'
                  onClick={() => {
                    setShowStatus((prev) => !prev);
                    filterByStatus(Status.DONE);
                  }}>
                  Show Done
                </button>
              </div>
              <div className='col-sm-6'>
                <h5 className='text-dark'>Filer by Priority</h5>
                <button
                  className='btn_ngen_filter me-2'
                  onClick={() => {
                    setShowPriority((prev) => !prev);
                    filterByPriority(Priority.LOW);
                  }}>
                  Show Low
                </button>
                <button
                  className='btn_ngen_filter me-2'
                  onClick={() => {
                    setShowPriority((prev) => !prev);
                    filterByPriority(Priority.MEDIUM);
                  }}>
                  Show Medium
                </button>
                <button
                  className='btn_ngen_filter me-2'
                  onClick={() => {
                    setShowPriority((prev) => !prev);
                    filterByPriority(Priority.HIGH);
                  }}>
                  Show High
                </button>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
        <div>
          {showStatus
            ? filterStatus.map((task: Task) => {
                return (
                  <SingleTask
                    task={task}
                    onEditTaskClick={(task) => setEditedTask({ ...task })}
                    onDeleteTaskClick={(taskId: any) => {
                      const updatedTasks = taskList.filter(
                        (task) => task.id !== taskId
                      );
                      setTaskList(updatedTasks);
                    }}
                  />
                );
              })
            : ''}
          {showPriority
            ? filterPriority.map((task: Task) => {
                return (
                  <SingleTask
                    task={task}
                    onEditTaskClick={(task) => setEditedTask({ ...task })}
                    onDeleteTaskClick={(taskId: any) => {
                      const updatedTasks = taskList.filter(
                        (task) => task.id !== taskId
                      );
                      setTaskList(updatedTasks);
                    }}
                  />
                );
              })
            : ''}
          {currentTasks.map((task: Task) => {
            return (
              <SingleTask
                task={task}
                onEditTaskClick={(task) => setEditedTask({ ...task })}
                onDeleteTaskClick={(taskId: any) => {
                  const updatedTasks = taskList.filter(
                    (task) => task.id !== taskId
                  );
                  setTaskList(updatedTasks);
                }}
              />
            );
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
