import React, { useState } from 'react';

import TreeChart from './TreeChart';
import ForceTreeChart from './ForceTreeChart';
import initialData from './initialData.json';

export const Tree = () => {
  const [data, setData] = useState(initialData);

  return (
    <React.Fragment>
      <h1>Animated Tree Chart</h1>
      <TreeChart data={data} />
      <button onClick={() => setData(initialData.children[0])}>
        Update data
      </button>

      <h2>🪐 D3 Force Layout</h2>
      <ForceTreeChart data={data} />
    </React.Fragment>
  );
};
