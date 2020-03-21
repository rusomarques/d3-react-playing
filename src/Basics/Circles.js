import React, { useRef, useEffect, useState } from 'react';
import { select } from 'd3';

export const Circles = () => {
  const [data, setData] = useState([25, 30, 45, 60, 20]);
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = select(svgRef.current);
    svg
      .selectAll('circle')
      .data(data)
      .join(
        enter => enter.append('circle').attr('class', 'new'),
        update => update.attr('class', 'updated'),
        exit => exit.remove()
      )
      .attr('r', value => value)
      .attr('cx', value => value * 3)
      .attr('cy', value => value * 3)
      .attr('stroke', 'green');
  }, [data]);

  return (
    <>
      <svg className="basics-svg" width={300} height={150} ref={svgRef}></svg>
      <button
        className="basics-button"
        type="button"
        onClick={() => setData(data.map(item => item + 5))}
      >
        CLICK
      </button>
      <button
        type="button"
        className="basics-button"
        onClick={() => setData(data.filter(item => item < 25))}
      >
        FILTER
      </button>
    </>
  );
};
