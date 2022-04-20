import { createSelector } from '@reduxjs/toolkit';
export const todoListSelector = state => state.todoList;
export const filterChange = state => state.filter.status;

export const todoSelector = createSelector(todoListSelector, filterChange, (todoList, filter) => {
  return todoList.filter(todo => {
    if (filter === 'all') {
      return todoList;
    }
    return filter === 'completed' ? todo.completed : !todo.completed;
  });
});
