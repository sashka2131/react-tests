import './styles.css';

import Question from './Question';
import React from 'react';
import ReactDOM from 'react-dom';
import data from './myjsonfile.json';

const App = () => {


  return (
    <div className="App">

      <Question questions={data} isOnlySearch={true}/>
      
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
