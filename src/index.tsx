import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import Editor from './components/Editor';
import './stylesheets/main.scss';

ReactDOM.render(
  <React.StrictMode>
    <Editor />
  </React.StrictMode>,
  document.getElementById('root')
);
