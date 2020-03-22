import React, { useState } from 'react';

import { ExpenseForm } from './ExpenseForm';
import { MoneyChart } from './MoneyChart/MoneyChart';
import './MoneyTracker.css';

import initialData from './initialData.json';

export const MoneyTracker = () => {
  const [data, setData] = useState(initialData);

  const handleOnAddItem = newItem => {
    setData([...data, newItem]);
  };

  return (
    <section className="indigo">
      <header className="indigo darken-1 section">
        <h2 className="center white-text">Money Tracker</h2>
        <p className="flow-text grey-text center text-lighten-2">
          Monthly money tracker for...
        </p>
      </header>

      <ExpenseForm onAddItem={handleOnAddItem} />

      <MoneyChart data={data} />
    </section>
  );
};
