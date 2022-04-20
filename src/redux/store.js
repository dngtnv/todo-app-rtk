import { configureStore } from '@reduxjs/toolkit';
import filterSlice from '../components/TodoList/Filters/filterSlice.js';
import todosSlice from '../components/TodoList/todosSlice.js';

const store = configureStore({
  reducer: {
    todoList: todosSlice.reducer,
    filter: filterSlice.reducer,
  },
});

export default store;
