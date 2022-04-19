export const addTodo = todo => {
  return {
    type: 'todoList/addTodo',
    payload: todo,
  };
};
export const filterChange = filter => {
  return {
    type: 'filter/filterChange',
    payload: filter,
  };
};
export const toggleTodoStatus = todoId => {
  return {
    type: 'todoList/toggleTodoStatus',
    payload: todoId,
  };
};
export const removeTodo = todoId => {
  return {
    type: 'todoList/removeTodo',
    payload: todoId,
  };
};
export const clearCompleted = () => {
  return {
    type: 'todoList/clearCompleted',
  };
};
export const replaceList = array => {
  return {
    type: 'todoList/replaceList',
    payload: array,
  };
};
