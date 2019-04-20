import React from 'react';
import BarChart from './components/BarChart';
import data from './data';
import './App.css';

const App = () => (
  <div className="app">
    <div className="intro">
      <h1>
        {' '}
        Proportion of seats held by women in lower or single houses of Middle Eastern and North African
        parliaments
      </h1>
      <p>
        {' '}
          Data provided by national parliaments by 01 January 2019 and compiled by the
        {' '}
        <a
          href="http://archive.ipu.org/wmn-e/classif.htm"
          target="_blank"
          rel="noopener noreferrer"
        >
          Inter-Parliamentary Union
        </a>
        .
      </p>
    </div>
    <BarChart data={data} />
  </div>
);

export default App;
