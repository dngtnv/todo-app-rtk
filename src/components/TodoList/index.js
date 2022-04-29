import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Filters from './Filters';
import filterSlice from './Filters/filterSlice.js';
import './index.scss';
import Todo from './Todo';

export default function TodoList({ todoList }) {
  const [filter, setFilter] = useState('all');
  const dispatch = useDispatch();

  const countTodoLeft = todoList.filter(todo => todo.completed === false).length;

  useEffect(() => {
    dispatch(filterSlice.actions.filterChange(filter));
  }, [filter, dispatch]);

  const filterTodo = filter => {
    switch (filter) {
      case 'all':
        setFilter('all');
        break;
      case 'active':
        setFilter('active');
        break;
      case 'completed':
        setFilter('completed');
        break;
      default:
        break;
    }
  };
  return (
    <div className="todo-list-wrapper">
      <ul className="todo-items">
        {todoList.map(todo => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </ul>
      <Filters countTodoLeft={countTodoLeft} filter={filter} filterTodo={filterTodo} />
    </div>
  );
}
