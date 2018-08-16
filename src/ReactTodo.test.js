import React from 'react';
import ReactDOM from 'react-dom';
import ReactTodo from './ReactTodo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ReactTodo />, div);
  ReactDOM.unmountComponentAtNode(div);
});
