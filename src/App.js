import React from 'react';
import _ from 'lodash';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import ReactTodo from './ReactTodo';
import AddTodoForm from './AddTodoForm';
import PropTypes from 'prop-types';

const TASK_STORE_KEY = 'tasks';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
    };

    this.onCreate = this.onCreate.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    this.hydrateStateWithLocalStorage();

    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      'beforeunload',
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      'beforeunload',
      this.saveStateToLocalStorage.bind(this)
    );

    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }

  hydrateStateWithLocalStorage() {

    if (localStorage.hasOwnProperty(TASK_STORE_KEY)) {
      // get the data from localStorage
      let data = localStorage.getItem(TASK_STORE_KEY);

      this.setState({
        tasks: JSON.parse(data),
      });
    }
  }

  saveStateToLocalStorage() {
    localStorage.setItem(TASK_STORE_KEY, JSON.stringify(this.state.tasks));
  }

  onCreate(todo) {
    const newItem = {
      id: 1 + Math.random(),
      status: todo.status,
      task: todo.task,
    };

    const updatedTasks = [...this.state.tasks];

    updatedTasks.push(newItem);

    this.setState({
      tasks: updatedTasks,
    });
  }

  onUpdate(todo) {

    const updatedTasks = [...this.state.tasks];
    const taskIndex = _.indexOf(updatedTasks, _.find(updatedTasks, {
      id: todo.id,
    }));

    updatedTasks.splice(taskIndex, 1, {
      id: todo.id,
      status: parseInt(todo.status, 10) ? 0 : 1,
      task: todo.title,
    });

    this.setState({
      tasks: updatedTasks,
    });
  }

  onDelete(id) {
    const tasks = [...this.state.tasks];

    const updatedTasks = tasks.filter(item => item.id !== id);

    this.setState({
      tasks: updatedTasks,
    });
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
