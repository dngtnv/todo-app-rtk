import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addDoc, collection, deleteDoc, doc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase/config.js';

export const todosColRef = collection(db, 'todos');
const todosSlice = createSlice({
  name: 'todoList',
  initialState: [], //{ status: 'idle', todos: [] }
  reducers: {
    addTodo: (state, action) => {
      state.splice(0, 0, action.payload);
    },
    toggleTodoStatus: (state, action) => {
      const currentTodo = state.find(todo => todo.id === action.payload);
      if (currentTodo) {
        currentTodo.completed = !currentTodo.completed;
      }
    },
    removeTodo: (state, action) => {
      return state.filter(todo => todo.id !== action.payload);
    },
    clearCompleted: state => {
      return state.filter(todo => todo.completed === false);
    },
    replaceList: (state, action) => {
      return (state = action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addTodos.rejected, (state, action) => {
        console.log('[addTodo] failure');
      })
      .addCase(updateTodos.rejected, (state, action) => {
        console.log(`[update] failure`);
      });
    // .addCase(deleteTodos.fulfilled, (state, action) => {
    //   console.log('deleted');
    // });
    // .addCase(getTodos.fulfilled, (state, action) => {
    //   return (state = action.payload);
    //   // state.status = 'idle';
    // })
  },
});
// export const getTodos = createAsyncThunk('todos/getTodos', async () => {
//   const data = await getDocs(todosColRef);
//   return data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
// });
export const addTodos = createAsyncThunk('todos/addNewTodo', async newTodo => {
  await addDoc(todosColRef, { name: newTodo.name, completed: newTodo.completed, createAt: serverTimestamp() });
});
export const updateTodos = createAsyncThunk('todos/updateTodo', async todo => {
  const docRef = doc(db, 'todos', todo.id);
  await updateDoc(docRef, { completed: !todo.completed });
  // return todo;
});
export const deleteTodos = createAsyncThunk('todos/deleteTodo', async todo => {
  const docRef = doc(db, 'todos', todo.id);
  await deleteDoc(docRef);
});
export const clearCompleteds = createAsyncThunk('todos/clearCompleted', async () => {
  const q = query(collection(db, 'todos'), where('completed', '==', true));
  const querySnapshot = await getDocs(q);
  const results = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  results.forEach(async result => {
    const docRef = doc(db, 'todos', result.id);
    await deleteDoc(docRef);
  });
});
export default todosSlice;
