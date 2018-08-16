import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import './bootstrap.min.css';
import './index.css';
import ReactTodo from './ReactTodo';
import AddTodoForm from './AddTodoForm';
import registerServiceWorker from './registerServiceWorker';

function App() {
  return <ReactTodo/>;
}

const TodoFormWrapper = withRouter(({ history }) =>
  <AddTodoForm onAddTodo={() => {
    history.push('/');
  }} />
);

ReactDOM.render(
  <BrowserRouter>
    <React.Fragment>
      <Route exact path="/" component={App} />
      <Route path="/add" component={TodoFormWrapper} />
    </React.Fragment>
  </BrowserRouter>, document.getElementById('root'));

registerServiceWorker();
