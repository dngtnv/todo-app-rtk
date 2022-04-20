import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as id } from 'uuid';
import './App.scss';
import moonIcon from './assets/images/icon-moon.svg';
import sunIcon from './assets/images/icon-sun.svg';
import TodoList from './components/TodoList';
import todosSlice from './components/TodoList/todosSlice.js';
import { todoSelector } from './redux/selectors';

function App() {
  const dispatch = useDispatch();
  const [todoInput, setTodoInput] = useState('');
  const todoList = useSelector(todoSelector);

  useEffect(() => {
    const storagedTodoList = localStorage.getItem('TODO_LIST');
    if (storagedTodoList) {
      dispatch(todosSlice.actions.replaceList(JSON.parse(storagedTodoList)));
    }
  }, [dispatch]);
  useEffect(() => {
    localStorage.setItem('TODO_LIST', JSON.stringify(todoList));
  }, [todoList]);

  const onTodoInputChange = useCallback(e => {
    setTodoInput(e.target.value);
  }, []);

  const onEnterPress = useCallback(
    e => {
      if (e.key === 'Enter') {
        if (todoInput === '') {
          e.preventDefault();
        } else {
          e.preventDefault();
          dispatch(
            todosSlice.actions.addTodo({
              id: id(),
              name: todoInput,
              completed: false,
            })
          );
          setTodoInput('');
        }
      }
    },
    [dispatch, todoInput]
  );

  let currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  if (localStorage.getItem('theme')) {
    currentTheme = localStorage.getItem('theme');
  }
  const [theme, setTheme] = useState(currentTheme);
  document.getElementsByTagName('body')[0].setAttribute('data-theme', theme);

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };
  const handleOnDragEnd = result => {
    if (!result.destination) return;
    const items = Array.from(todoList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch(todosSlice.actions.replaceList(items));
  };
  return (
    <div className="container">
      <div className="cover-image" cover-theme={theme}></div>
      <div className="main">
        <div className="header">
          <div className="title">
            <h1>TODO</h1>
          </div>
          <div className="theme">
            <button className="switch-theme" onClick={switchTheme}>
              {theme === 'light' ? <img src={moonIcon} alt="moon" /> : <img src={sunIcon} alt="sun" />}
            </button>
          </div>
        </div>
        <div className="new-todo">
          <div className="check">
            <div className="check-mark"></div>
          </div>
          <div className="todo-input">
            <form>
              <input type="text" placeholder="Create a new todo..." value={todoInput} onChange={onTodoInputChange} onKeyPress={onEnterPress} />
            </form>
          </div>
        </div>
        <TodoList todoList={todoList} handleOnDragEnd={handleOnDragEnd} />
        <div className="notice">Drag and drop to reorder list</div>
      </div>
    </div>
  );
}

export default App;
