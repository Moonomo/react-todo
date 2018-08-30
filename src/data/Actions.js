import ActionTypes from './ActionTypes';
import Dispatcher from './Dispatcher';

const TASK_STORE_KEY = 'tasks';

const AppActions = {
  loadTodoData() {
    let tasks = [];

    if (localStorage.hasOwnProperty(TASK_STORE_KEY)) {
      tasks = JSON.parse(localStorage.getItem(TASK_STORE_KEY));
    }

    Dispatcher.dispatch({
      type: ActionTypes.LOAD_TODO_DATA,
      tasks,
    });
  },

  saveTodoData(tasks) {
    localStorage.setItem(TASK_STORE_KEY, JSON.stringify(tasks));

    Dispatcher.dispatch({
      type: ActionTypes.SAVE_TODO_DATA,
      tasks,
    });
  },

  createTodo(text) {
    Dispatcher.dispatch({
      type: ActionTypes.CREATE_TODO,
      text,
    });
  },

  updateTodo(todo) {
    Dispatcher.dispatch({
      type: ActionTypes.UPDATE_TODO,
      todo,
    });
  },

  deleteTodo(id) {
    Dispatcher.dispatch({
      type: ActionTypes.DELETE_TODO,
      id,
    });
  },
};

export default AppActions;
