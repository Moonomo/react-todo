import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import './bootstrap.min.css';
import './index.css';
import ReactTodo from './ReactTodo';
import AddTodoForm from './AddTodoForm';

class App extends React.Component {

  state = {
    tasks: []
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

  onAddTodo = ( todo ) => {
    this.state.tasks.push(todo);
  };

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Route exact path="/" render={() => <ReactTodo tasks={this.state.tasks} onToggle={this.onToggle}/>}/>
          <Route exact path="/add"
            render={() => <TodoFormWrapper tasks={this.state.tasks} onAddTodo={this.onAddTodo}/>}/>
        </React.Fragment>
      </BrowserRouter>
    )
  }
}

const TodoFormWrapper = withRouter(( props ) => (
  <AddTodoForm
    {...props}
    onAddTodo={( todo ) => {
      props.onAddTodo(todo);
      props.history.push('/');
    }}/>
));

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);

registerServiceWorker();
