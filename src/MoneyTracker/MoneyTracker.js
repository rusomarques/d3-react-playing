import React from 'react';

import './MoneyTracker.css';
import { ExpenseForm } from './ExpenseForm';
import { MoneyChart } from './MoneyChart';

import mockData from './mockData.json';

export const MoneyTracker = () => {
  return (
    <section className="indigo">
      <header className="indigo darken-1 section">
        <h2 className="center white-text">Ninja Wong</h2>
        <p className="flow-text grey-text center text-lighten-2">
          Monthly money tracker for ninjas...
        </p>
      </header>
      <div className="container section">
        <div className="row">
          <div className="col s12 m6">
            <ExpenseForm />
          </div>
          <div className="col s12 m6 push-m1">
            {/* <div className="canvas"></div> */}
            <MoneyChart data={mockData} />
          </div>
        </div>
      </div>
    </section>
  );
};
