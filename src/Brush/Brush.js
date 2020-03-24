import React, { useState } from 'react';

import BrushChart from './BrushChart';
import './Brush.css';
import ChildChart from './ChildChart';

const Brush = () => {
  const [data, setData] = useState(
    Array.from({ length: 30 }).map(() => Math.round(Math.random() * 100))
  );
  const onAddDataClick = () =>
    setData([...data, Math.round(Math.random() * 100)]);

  return (
    <section className="brush">
      <h2>Sub-selections with d3-brush</h2>

      <BrushChart data={data}>
        {({ selection }) => <ChildChart data={data} selection={selection} />}
      </BrushChart>

      <button className="button" onClick={onAddDataClick}>
        Add data
      </button>
    </section>
  );
};

export default Brush;
