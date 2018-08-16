import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.min.css';
import './index.css';
import ReactTodo from './ReactTodo';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ReactTodo />, document.getElementById('root'));
registerServiceWorker();
