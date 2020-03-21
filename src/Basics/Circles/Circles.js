import React, { useRef, useEffect } from 'react';
import { select } from 'd3';

export const Circles = ({ data }) => {
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
    <svg
      className="basics-svg"
      style={{ backgroundColor: '#eee', overflow: 'visible' }}
      width={300}
      height={150}
      ref={svgRef}
    ></svg>
  );
};
