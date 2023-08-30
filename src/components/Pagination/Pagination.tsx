import React from 'react';

type Paginate = {
  totalPosts: number;
  postsPerPage: number;
  paginate: (number: number) => void;
};

const Pagination: React.FC<Paginate> = ({
  totalPosts,
  postsPerPage,
  paginate,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className='pages'>
      <ul>
        {pageNumbers.map((number) => (
          <li className='task-list' key={number}>
            <a onClick={() => paginate(number)} href='!#'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
