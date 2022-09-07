import React from 'react';
import ReactDOM from 'react-dom';
import Typography from '@material-ui/core/Typography';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import Question from './Question';
import useTodoState from './useTodoState';
import './styles.css';

import data from './myjsonfile.json';

const App = () => {
  const { todos, addTodo, deleteTodo } = useTodoState([]);

  var questionIndex = 0;

  return (
    <div className="App">
      <Typography class="shtativchiki" component="h1" variant="h2">
        ...
      </Typography>

      <Question questions={data}/>
      
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
