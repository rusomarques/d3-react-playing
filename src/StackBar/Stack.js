import React, { useState } from 'react';

import initialData from './initialData.json';
import StackedBarChart from './StackedBarChart';
import StackedAreaChart from './StackedAreaChart';
import './Stack.css';

const allKeys = ['🥑', '🍌', '🍆'];

const colors = {
  '🥑': 'green',
  '🍌': 'orange',
  '🍆': 'purple'
};

const Stack = () => {
  const [data, setData] = useState(initialData);
  const [keys, setKeys] = useState(allKeys);

  return (
    <section className="stack-bar">
      <h2>Stacked Bar Chart with D3 </h2>
      <StackedBarChart data={data} keys={keys} colors={colors} />

      <StackedAreaChart data={data} keys={keys} colors={colors} />

      <div className="fields">
        {allKeys.map(key => (
          <div key={key} className="field">
            <input
              id={key}
              type="checkbox"
              checked={keys.includes(key)}
              onChange={e => {
                if (e.target.checked) {
                  setKeys(Array.from(new Set([...keys, key])));
                } else {
                  setKeys(keys.filter(_key => _key !== key));
                }
              }}
            />
            <label htmlFor={key} style={{ color: colors[key] }}>
              {key}
            </label>
          </div>
        ))}
      </div>

      <button
        onClick={() =>
          setData([
            ...data,
            {
              year: Math.max(...data.map(d => d.year)) + 10,
              '🥑': Math.round(Math.random() * 100),
              '🍌': Math.round(Math.random() * 125),
              '🍆': Math.round(Math.random() * 150)
            }
          ])
        }
      >
        Add data
      </button>
    </section>
  );
};

export default Stack;
