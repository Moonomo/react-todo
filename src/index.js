import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import _ from 'lodash';
import './bootstrap.min.css';
import './index.css';
import ReactTodo from './ReactTodo';
import AddTodoForm from './AddTodoForm';

const TASK_STORE_KEY = 'tasks';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
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

  onAdd = (todo) => {
    const newItem = {
      id: 1 + Math.random(),
      status: todo.status,
      task: todo.task,
    };

    this.state.tasks.push(newItem);

    this.setState({
      tasks: this.state.tasks,
    });
  };

  onUpdate = (todo) => {
    const taskIndex = _.indexOf(this.state.tasks, _.find(this.state.tasks, {
      id: todo.id,
    }));

    this.state.tasks.splice(taskIndex, 1, {
      id: todo.id,
      status: parseInt(todo.status, 10) ? 0 : 1,
      task: todo.title,
    });

    this.setState({
      tasks: this.state.tasks,
    });
  };

  onDelete = (todo) => {
    this.state.tasks.filter(item => item.id !== todo.id);

    this.setState({
      tasks: this.state.tasks,
    });
  };

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Route exact path="/"
                 render={() => <ReactTodo tasks={this.state.tasks} onToggle={this.onUpdate} />} />
          <Route exact path="/add"
                 render={() => <TodoFormWrapper tasks={this.state.tasks}
                                                onAddTodo={this.onAdd} />} />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

const TodoFormWrapper = withRouter((props) => (
  <AddTodoForm
    {...props}
    onAddTodo={(todo) => {
      props.onAddTodo(todo);
      props.history.push('/');
    }} />
));

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

registerServiceWorker();
