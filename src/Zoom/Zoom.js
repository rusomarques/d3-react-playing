import React, { useState } from 'react';

import ZoomableLineChart from './ZoomableLineChart';
import './Zoom.css';

const Zoom = () => {
  const [data, setData] = useState(
    Array.from({ length: 50 }, () => Math.round(Math.random() * 100))
  );

  return (
    <>
      <h2>Zoomable Line Chart with D3 </h2>
      <ZoomableLineChart data={data} />
      <button
        onClick={() => setData([...data, Math.round(Math.random() * 100)])}
      >
        Add data
      </button>
    </>
  );
};

export default Zoom;
