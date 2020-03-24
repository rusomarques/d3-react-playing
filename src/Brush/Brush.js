import React, { useState } from 'react';

import BrushChart from './BrushChart';
import './Brush.css';

const Brush = () => {
  const [data, setData] = useState([10, 25, 30, 40, 25, 60]);
  const onAddDataClick = () =>
    setData([...data, Math.round(Math.random() * 100)]);

  return (
    <section className="brush">
      <h2>Sub-selections with d3-brush</h2>

      <BrushChart data={data} />

      <button className="button" onClick={onAddDataClick}>
        Add data
      </button>
    </section>
  );
};

export default Brush;
