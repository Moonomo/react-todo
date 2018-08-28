import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ReactTodo.css';

const List = (props) =>
  <div className="todo-list">
    {props.tasks.map((todo) =>
      <Todo onToggle={props.onToggle} key={todo.id} title={todo.task}
            id={todo.id} status={todo.status} />
    )}
  </div>
;

const Todo = (props) => {

  const statusToClassName = () => {
    const mapping = {
      0: 'todo-item',
      1: 'todo-item done',
    };
    return mapping[props.status];
  };

  return (
    <div className={statusToClassName()} onClick={() => props.onToggle(props)}>
      <div className="todo-mark">.</div>
      <div className="todo-title">{props.title}</div>
    </div>
  );
};

Todo.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
};

const ReactTodo = (props) =>
  <div className="container todo-container">
    <h1 className="page-title">(todo)</h1>
    <List tasks={props.tasks} onToggle={props.onToggle} />
    <div className="form-button text-center">
      <Link to="/add" className="btn btn-primary btn-add">+</Link>
    </div>
  </div>
;

export default ReactTodo;
