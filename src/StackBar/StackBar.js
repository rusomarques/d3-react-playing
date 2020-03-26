import React, { useState } from 'react';

import data from './initialData.json';
import StackedBarChart from './StackedBarChart';
import './StackBar.css';

const allKeys = ['🥑', '🍌', '🍆'];

const colors = {
  '🥑': 'green',
  '🍌': 'orange',
  '🍆': 'purple'
};

const StackBar = () => {
  const [keys, setKeys] = useState(allKeys);

  return (
    <section className="stack-bar">
      <h2>Stacked Bar Chart with D3 </h2>
      <StackedBarChart data={data} keys={keys} colors={colors} />

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
    </section>
  );
};

export default StackBar;
