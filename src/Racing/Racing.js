import React, { useState } from 'react';

import useInterval from '../hooks/useInterval';
import getRandomIndex from '../Utils/getRandomIndex';
import RacingBarChart from './RacingBarChart';
import initData from './initData.json';

export const Racing = () => {
  const [iteration, setIteration] = useState(0);
  const [start, setStart] = useState(false);
  const [data, setData] = useState(initData);

  useInterval(() => {
    if (start) {
      const randomIndex = getRandomIndex(data);
      const updatedData = data
        .map((entry, index) => ({
          ...entry,
          ...(index === randomIndex && { value: entry.value + 10 })
        }))
        .sort((b, a) => a.value - b.value);

      setData(updatedData);
      setIteration(iteration + 1);
    }
  }, 300);

  return (
    <React.Fragment>
      <h1>Racing Bar Chart</h1>
      <RacingBarChart data={data} />
      <button onClick={() => setStart(!start)}>
        {start ? 'Stop the race' : 'Start the race!'}
      </button>
      <p>Iteration: {iteration}</p>
    </React.Fragment>
  );
};
