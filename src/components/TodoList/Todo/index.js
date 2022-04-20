import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import checkIcon from '../../../assets/images/icon-check.svg';
import crossIcon from '../../../assets/images/icon-cross.svg';
import todosSlice from '../todosSlice.js';
import './index.scss';

export default function Todo({ todo, provided, innerRef }) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(todo.completed);
  const toggleCheckBox = () => {
    setChecked(!checked);
    dispatch(todosSlice.actions.toggleTodoStatus(todo.id));
  };
  const handleRemoveTodo = () => {
    dispatch(todosSlice.actions.removeTodo(todo.id));
  };
  return (
    <li className={`todo-item ${checked === true ? 'checked' : ''}`} {...provided.draggableProps} {...provided.dragHandleProps} ref={innerRef}>
      <div className="check">
        <div className="check-mark" onClick={toggleCheckBox}>
          <img src={checkIcon} alt="check" />
        </div>
      </div>
      <div className="todo-text">{todo.name}</div>
      <div className="remove-todo" onClick={handleRemoveTodo}>
        <img src={crossIcon} alt="remove todo" />
      </div>
    </li>
  );
}
