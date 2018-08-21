import React from 'react';

class TodoForm extends React.Component {
  constructor( props ) {
    super(props);
    this.state = {
      status: 0,
      task: ''
    };
    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = ( event ) => {
    event.preventDefault();
    this.props.onAddTodo(this.state);
  };

  onFieldChange = ( event ) => {
    this.setState({
      [ event.target.name ]: event.target.value
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="task" className="sr-only">Add task to your todo list</label>
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

const Header = () => {
  return (
    <h1 className="page-title">(new task)</h1>
  );
};

const AddTodoForm = ( {match, onAddTodo} ) => {
  return (
    <div className="container todo-container">
      <Header/>
      <TodoForm onAddTodo={onAddTodo}/>
    </div>
  );
};

export default AddTodoForm;
