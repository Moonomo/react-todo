import React from 'react';
import {Link} from 'react-router-dom';
import './ReactTodo.css';

const Header = () => {
  return (
    <h1 className="page-title">Todo</h1>
  );
};

class List extends React.Component {

  state = {
    tasks: this.props.tasks
  };

  onToggle = ( event ) => {
    event.preventDefault();

    const newStatus = parseInt(event.target.dataset.status, 10) ? 0 : 1;
    let updatedTasks = this.state.tasks.map(( todo, index ) => {
      if (index === parseInt(event.target.dataset.id, 10)) {
        todo = Object.assign({}, todo, {status: newStatus});
      }

      return todo;
    });

    this.setState({
      tasks: updatedTasks
    });
  };

  render() {
    return (
      <div className="todo-list">
        {this.state.tasks.map(( todo, index ) =>
          <Todo onToggle={this.onToggle} key={todo.task} id={index} title={todo.task}
            status={todo.status}/>
        )}
      </div>
    )
  }
}

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
