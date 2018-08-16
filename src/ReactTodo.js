import React from 'react';
import {Link} from 'react-router-dom';
import './ReactTodo.css';

function Header() {
  return (
    <h1 className="page-title">Todo</h1>
  );
}

function List() {
  return (
    <div className="todo-list">
      <div className="todo-item">
        <div>
          <input id="todo-1" className="form-check-input" type="checkbox"/>
          <label htmlFor="todo-1" className="form-check-label">
            Attend dev meeting.
          </label>
        </div>
        <span>Attend dev meeting.</span>
      </div>

      <div className="todo-item">
        <div>
          <input id="todo-2" className="form-check-input" type="checkbox"/>
          <label htmlFor="todo-2" className="form-check-label">
            Check out Codepen.
          </label>
        </div>
        <span>Check out json-scheme-form.</span>
      </div>

      <div className="todo-item done">
        <div>
          <input id="todo-4" className="form-check-input" type="checkbox" disabled/>
          <label htmlFor="todo-4" className="form-check-label">
            Completed task.
          </label>
        </div>
        <span>Completed task.</span>
      </div>
    </div>
  );
}

function ReactTodo() {
  return (
    <div className="container todo-container">
      <Header/>
      <List/>
      <div className="form-button text-center">
        <Link to="/add" className="btn btn-primary btn-add">+</Link>
      </div>
    </div>
  );
}

export default ReactTodo;
