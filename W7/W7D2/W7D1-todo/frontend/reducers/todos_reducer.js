import { RECEIVE_TODOS, RECEIVE_TODO, REMOVE_TODO } from '../actions/todo_actions';
import merge from 'lodash/merge';

const initialState = {
  1: {
    id: 1,
    title: "wash car",
    body: "with soap",
    done: false
  },
  2: {
    id: 2,
    title: "wash dog",
    body: "with shampoo",
    done: true
  },
};


const todosReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case RECEIVE_TODOS:
      newState = {};
      action.todos.forEach(todo => { newState[todo.id] = todo; });
      return newState;
    case RECEIVE_TODO:
      newState = { [action.todo.id]: action.todo };
      return merge({}, state, newState);
    case REMOVE_TODO:
      newState = merge({}, state);
      delete newState[action.todo.id];
      return newState;
    default:
      return state;
  }
};

export default todosReducer;
