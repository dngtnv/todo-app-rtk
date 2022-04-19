const initState = {
  filter: {
    status: 'all',
  },
  todoList: [],
};
const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case 'todoList/addTodo':
      return {
        ...state,
        todoList: [action.payload, ...state.todoList],
      };
    case 'filter/filterChange':
      return {
        ...state,
        filter: action.payload,
      };
    case 'todoList/toggleTodoStatus':
      return {
        ...state,
        todoList: state.todoList.map(todo => (todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo)),
      };
    case 'todoList/removeTodo':
      return {
        ...state,
        todoList: state.todoList.filter(todo => todo.id !== action.payload),
      };
    case 'todoList/clearCompleted':
      return {
        ...state,
        todoList: state.todoList.filter(todo => todo.completed === false),
      };
    case 'todoList/replaceList':
      return {
        ...state,
        todoList: action.payload,
      };
    default:
      return state;
  }
};
export default rootReducer;
