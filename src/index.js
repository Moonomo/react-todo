import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import './bootstrap.min.css';
import './index.css';
import ReactTodo from './ReactTodo';
import AddTodoForm from './AddTodoForm';
import registerServiceWorker from './registerServiceWorker';

const tasks = [
  {
    status: 0,
    task: 'Attend dev meeting.'
  },
  {
    status: 0,
    task: 'Check out json-scheme-form.'
  },
  {
    status: 1,
    task: 'Completed task.'
  }
];

const App = () => {
  return (
    <ReactTodo tasks={tasks}/>
  );
};

const TodoFormWrapper = withRouter(( {history} ) =>
  <AddTodoForm onAddTodo={( todo ) => {
    tasks.push(todo);
    history.push('/');
  }}/>
);

ReactDOM.render(
  <BrowserRouter>
    <React.Fragment>
      <Route exact path="/" component={App}/>
      <Route path="/add" component={TodoFormWrapper}/>
    </React.Fragment>
  </BrowserRouter>, document.getElementById('root'));

registerServiceWorker();
