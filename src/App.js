import React from 'react';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import ReactTodo from './ReactTodo';
import AddTodoForm from './AddTodoForm';
import PropTypes from 'prop-types';
import Store from './data/Store';
import Actions from './data/Actions';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentWillMount() {
    Store.addChangeListener(this.onChange);
  }

  componentDidMount() {
    Actions.loadTodoData();

    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      'beforeunload',
      this.saveStateToLocalStorage.bind(this)
    );
  }

  // Clean up when this component is unmounted
  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);

    window.removeEventListener(
      'beforeunload',
      this.saveStateToLocalStorage.bind(this)
    );

    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }

  onChange() {
    this.setState({
      tasks: Store.getAllData(),
    });
  }

  saveStateToLocalStorage() {
    Actions.saveTodoData(Store.getAllData());
  }

  onCreate(todo) {
    Actions.createTodo(todo.task);
  }

  onUpdate(todo) {
    Actions.updateTodo(todo);
  }

  onDelete(id) {
    Actions.deleteTodo(id);
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Route exact path="/"
                 render={() => <ReactTodo tasks={this.state.tasks}
                                          onUpdate={this.onUpdate}
                                          onDelete={this.onDelete} />} />
          <Route exact path="/add"
                 render={() => <WrappedTodoForm tasks={this.state.tasks}
                                                onCreate={this.onCreate} />} />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

const WrappedTodoForm = withRouter((props) => (
  <AddTodoForm
    {...props}
    onCreate={(todo) => {
      props.onCreate(todo);
      props.history.push('/');
    }} />
));

WrappedTodoForm.propTypes = {
  tasks: PropTypes.array.isRequired,
  onCreate: PropTypes.func.isRequired,
};

export default App;
