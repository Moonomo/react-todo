import React from 'react';
import {Link} from 'react-router-dom';
import {uniqueId} from 'underscore';
import './ReactTodo.css';

const Header = () => {
  return (
    <h1 className="page-title">Todo</h1>
  );
};

const List = ( {tasks} ) => {
  return (
    <div className="todo-list">
      {tasks.map(( todo ) =>
        <Todo key={todo.task} title={todo.task} status={todo.status}/>
      )}
    </div>
  );
};

class Todo extends React.Component {

  state = {
    id: uniqueId('todo-')
  };

  statusToClassName = () => {
    const mapping = {
      0: 'todo-item',
      1: 'todo-item done'
    };
    return mapping[ this.props.status ];
  };

  statusToDisableAttr = () => {
    return this.props.status ? 'disabled' : false;
  };

  render() {
    return (
      <div className={this.statusToClassName()}>
        <div>
          <input id={this.state.id} disabled={this.statusToDisableAttr()} className="form-check-input" type="checkbox"/>
          <label htmlFor={this.state.id} className="form-check-label">
            {this.props.title}
          </label>
        </div>
        <span>{this.props.title}</span>
      </div>
    );
  }
}

const ReactTodo = ( {tasks} ) => {
  return (
    <div className="container todo-container">
      <Header/>
      <List tasks={tasks}/>
      <div className="form-button text-center">
        <Link to="/add" className="btn btn-primary btn-add">+</Link>
      </div>
    </div>
  );
};

export default ReactTodo;
