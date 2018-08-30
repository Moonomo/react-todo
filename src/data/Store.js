import Dispatcher from './Dispatcher';
import ActionTypes from './ActionTypes';
import EventEmitter from 'events';
import _ from 'lodash';

const CHANGE_EVENT = 'change';
let _data = [];

class AppStore extends EventEmitter {

  // Hooks a callback to the changed event
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  // Removes the listener from the changed event
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  // Fire state change event
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getAllData() {
    return _data;
  }

  getTodoById(id) {
    return _.find(_data, { id: id });
  }
}

const Store = new AppStore();

Dispatcher.register(function (action) {
  switch (action.type) {
    case ActionTypes.LOAD_TODO_DATA:
      _data = action.tasks;
      Store.emitChange();
      break;

    case ActionTypes.SAVE_TODO_DATA:
      _data = action.tasks;
      Store.emitChange();
      break;

    case ActionTypes.CREATE_TODO:
      const newItem = {
        id: 1 + Math.random(),
        status: 0,
        task: action.text,
      };
      _data.push(newItem);
      Store.emitChange();
      break;

    case ActionTypes.UPDATE_TODO:
      let existingTodoIndex = _.indexOf(_data, Store.getTodoById(action.todo.id));

      _data.splice(existingTodoIndex, 1, {
        id: action.todo.id,
        status: parseInt(action.todo.status, 10) ? 0 : 1,
        task: action.todo.title,
      });

      Store.emitChange();
      break;

    case ActionTypes.DELETE_TODO:
      _.remove(_data, item => item.id === action.id);
      Store.emitChange();
      break;

    default:
      break;
  }
});

export default Store;
