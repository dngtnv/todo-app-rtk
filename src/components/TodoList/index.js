import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { filterChange } from '../../redux/actions.js';
import Filters from './Filters';
import './index.scss';
import Todo from './Todo';

export default function TodoList({ todoList, handleOnDragEnd }) {
  const [filter, setFilter] = useState('all');
  const dispatch = useDispatch();

  const countTodoLeft = todoList.filter(todo => todo.completed === false).length;

  useEffect(() => {
    dispatch(filterChange(filter));
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
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="todos">
          {provided => {
            return (
              <ul className="todo-items" {...provided.droppableProps} ref={provided.innerRef}>
                {todoList.map((todo, index) => (
                  <Draggable key={todo.id} draggableId={todo.id} index={index} isDragDisabled={filter === 'all' ? false : true}>
                    {provided => {
                      return <Todo todo={todo} provided={provided} innerRef={provided.innerRef} />;
                    }}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            );
          }}
        </Droppable>
      </DragDropContext>
      <Filters countTodoLeft={countTodoLeft} filter={filter} filterTodo={filterTodo} />
    </div>
  );
}
