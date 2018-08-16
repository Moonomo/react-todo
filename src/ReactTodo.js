import React, {Component} from 'react';
import './ReactTodo.css';

class ReactTodo extends Component {
  render() {
    return (
      <div className="container todo-container">
        <h1 className="pagae-title text-center">Todo</h1>

        <div className="form-group todo-list">
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

        <div className="form-group form-button text-center">
          <button className="btn btn-primary">+</button>
        </div>
      </div>
    );
  }
}

export default ReactTodo;
