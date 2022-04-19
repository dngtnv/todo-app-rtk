import { composeWithDevTools } from '@redux-devtools/extension';
import { createStore } from 'redux';
import rootReducer from './reducer.js';

const composedEnhancers = composeWithDevTools();
const store = createStore(rootReducer, composedEnhancers); //initValue, enhancers

export default store;
