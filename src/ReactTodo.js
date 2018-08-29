import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ReactTodo.css';

function Todo(props) {
  const onToggle = () => {
    if (props.deleteIsOn) {
      props.onDelete(props.id);
    } else {
      props.onUpdate(props);
    }
  };

  return (
    <div className={'todo-item' + (props.status ? ' done' : '')}
         onClick={onToggle}>
      <div className="todo-mark">.</div>
      <div className="todo-title">{props.title}</div>
    </div>
  );
}

Todo.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  deleteIsOn: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

function List(props) {
  return (
    <div className={'todo-list' + (props.deleteIsOn ? ' delete' : ' update')}>
      {props.tasks.map((todo) =>
        <Todo key={todo.id}
              id={todo.id}
              status={todo.status}
              title={todo.task}
              deleteIsOn={props.deleteIsOn}
              onUpdate={props.onUpdate}
              onDelete={props.onDelete} />
      )}
    </div>
  );
}

List.propTypes = {
  tasks: PropTypes.array.isRequired,
  deleteIsOn: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

class ReactTodo extends React.Component {

  static propTypes = {
    tasks: PropTypes.array.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      deleteIsOn: false,
    };

    this.onToggle = this.onToggle.bind(this);
  }

  onToggle() {
    const deleteIsOn = !this.state.deleteIsOn;

    this.setState({
      deleteIsOn: deleteIsOn,
    });
  }

  render() {
    return (
      <div className="container todo-container">
        <h1 className="page-title">{this.state.deleteIsOn ? '(delete)' : '(todo)'}</h1>
        <List
          tasks={this.props.tasks}
          deleteIsOn={this.state.deleteIsOn}
          onUpdate={this.props.onUpdate}
          onDelete={this.props.onDelete} />
        <div className="form-button text-center">
          {!this.state.deleteIsOn ?
            <Link to="add" className="btn btn-primary btn-add">+</Link> : ''}
          {this.state.deleteIsOn || this.props.tasks.length ?
            <button type="button"
                    className="btn-toggle delete"
                    onClick={this.onToggle}
            >[{!this.state.deleteIsOn ? 'delete' : 'todo'}]</button> : ''}
        </div>
      </div>
    );
  }
}

export default ReactTodo;
