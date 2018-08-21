import React from 'react';
import {Link} from 'react-router-dom';
import './ReactTodo.css';

const Header = () => {
  return (
    <h1 className="page-title">(todo)</h1>
  );
};

const List = ( props ) => {

  return (
    <div className="todo-list">
      {props.tasks.map(( todo, index ) =>
        <Todo onToggle={props.onToggle} key={todo.task} id={index} title={todo.task}
          status={todo.status}/>
      )}
    </div>
  )
};

const Todo = ( props ) => {

  const statusToClassName = () => {
    const mapping = {
      0: 'todo-item',
      1: 'todo-item done'
    };
    return mapping[ props.status ];
  };

  return (
    <div className={statusToClassName()} onClick={props.onToggle} data-id={props.id} data-status={props.status}>
      <div className="todo-mark">.</div>
      <div className="todo-title">{props.title}</div>
    </div>
  );
};

const ReactTodo = ( props ) => {
  return (
    <div className="container todo-container">
      <Header/>
      <List tasks={props.tasks} onToggle={props.onToggle}/>
      <div className="form-button text-center">
        <Link to="/add" className="btn btn-primary btn-add">+</Link>
      </div>
    </div>
  );
};

export default ReactTodo;
