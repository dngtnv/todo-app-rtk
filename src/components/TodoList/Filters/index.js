import React from 'react';
import { useDispatch } from 'react-redux';
import { clearCompleteds } from '../todosSlice.js';
import './index.scss';

export default function Info({ filter, filterTodo, countTodoLeft }) {
  const dispatch = useDispatch();
  const onClearCompleted = () => {
    dispatch(clearCompleteds());
  };
  return (
    <div className="todo-items-info">
      <div className="items-left">{countTodoLeft > 1 ? `${countTodoLeft} items left` : `${countTodoLeft} item left`}</div>
      <div className="items-filters">
        <span className={filter === 'all' ? 'active' : ''} onClick={() => filterTodo('all')}>
          All
        </span>
        <span className={filter === 'active' ? 'active' : ''} onClick={() => filterTodo('active')}>
          Active
        </span>
        <span className={filter === 'completed' ? 'active' : ''} onClick={() => filterTodo('completed')}>
          Completed
        </span>
      </div>
      <div className="items-clear">
        <span onClick={onClearCompleted}>Clear Completed</span>
      </div>
    </div>
  );
}
