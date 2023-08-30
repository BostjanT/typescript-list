import { useState, ChangeEvent } from 'react';
import Logo from '../assets/images/logo.png';
import { nanoid } from 'nanoid';
import Pagination from './Pagination/Pagination';
import AddTaskForm from './AddTaskForm';

type Tasks = {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  date: string;
  add: string;
};

enum Status {
  NEW = 'new',
  DONE = 'done',
  onHOLD = 'onHold',
  PENDING = 'pending',
}

enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

const Tasks = () => {
  const [tasks, setTasks] = useState([] as any);
  const [title, setTitle] = useState('');
  const [newTask, setNewTask] = useState('');
  const [taskId, setTaskId] = useState('');
  const [addFile, setAddFile] = useState<File>();
  const [status, setStatus] = useState<Status>(Status.NEW);
  const [priorities, setPriorities] = useState<Priority>();

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

  const handleAddFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAddFile(e.target.files[0]);
    }
  };

  const handleRadio = (e: ChangeEvent<HTMLInputElement>) => {
    setPriorities(e.target.value);
  };

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
        <AddTaskForm
          title={title}
          setTitle={setTitle}
          newTask={newTask}
          setNewTask={setNewTask}
          addTask={addTask}
          editTask={editTask}
          taskId={taskId}
          handleRadio={handleRadio}
          handleAddFile={handleAddFile}
        />
        <div>
          {currentTasks.map((task: Tasks) => {
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
