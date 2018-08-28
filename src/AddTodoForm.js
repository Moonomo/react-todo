import React from 'react';

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 0,
      task: '',
      formErrors: {
        task: '',
      },
      taskValid: false,
      formValid: false,
    };
    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateField = (fieldName, value) => {
    let fieldValidationErrors = this.state.formErrors;
    let taskValid = this.state.taskValid;

    switch (fieldName) {
      case 'task':
        taskValid = value.length >= 3;
        fieldValidationErrors.task = taskValid ? '' : ' should be at-least 3 characters or more.';
        break;
      default:
        break;
    }

    this.setState({
      formErrors: fieldValidationErrors,
      taskValid: taskValid,
    }, this.validateForm);
  };

  validateForm = () => {
    this.setState({
      formValid: this.state.taskValid,
    });
  };

  errorClass = (error) => (error.length === 0 ? '' : 'has-error');

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onAddTodo(this.state);
  };

  onFieldChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(
      {
        [name]: value,
      },
      () => {
        this.validateField(name, value);
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className={`form-group ${this.errorClass(this.state.formErrors.task)}`}>
          <label htmlFor="task" className="sr-only">Add task to your todo list</label>
          <textarea className="form-control" name="task" value={this.state.task}
                    onChange={this.onFieldChange} />
        </div>
        <FormErrors formErrors={this.state.formErrors} />
        <div className="form-group form-button">
          <button type="submit"
                  className="btn btn-primary btn-add"
                  disabled={!this.state.formValid}>&#x2714;</button>
        </div>
      </form>
    );
  }
}

const Header = () =>
  <h1 className="page-title">(new task)</h1>
;

const FormErrors = ({ formErrors }) =>
  <div className="formErrors">
    {Object.keys(formErrors).map((fieldName, i) => {
      if (formErrors[fieldName].length > 0) {
        return (
          <p key={i}>&#x26A0; {fieldName} {formErrors[fieldName]}</p>
        );
      } else {
        return '';
      }
    })}
  </div>
;

const AddTodoForm = ({ match, onAddTodo }) =>
  <div className="container todo-container">
    <Header />
    <TodoForm onAddTodo={onAddTodo} />
  </div>
;

export default AddTodoForm;
