import React from 'react';

class TodoForm extends React.Component {
  constructor( props ) {
    super(props);
    this.state = {
      task: ''
    };
    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit( event ) {
    event.preventDefault();
    this.props.onAddTodo(this.state);
  }

  onFieldChange( event ) {
    this.setState({
      [ event.target.name ]: event.target.value
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="task" className="hidden">Add Task</label>
          <input type="text" className="form-control" name="task" value={this.state.task}
            onChange={this.onFieldChange}/>
        </div>
        <div className="form-group form-button">
          <button type="submit" className="btn btn-primary btn-add">&#x2714;</button>
        </div>
      </form>
    );
  }
}

function Header() {
  return (
    <h1 className="page-title">Todo</h1>
  );
}

function AddTodoForm( {match, onAddTodo} ) {
  return (
    <div className="container todo-container">
      <Header/>
      <TodoForm onAddTodo={onAddTodo}/>
    </div>
  );
}

export default AddTodoForm;
