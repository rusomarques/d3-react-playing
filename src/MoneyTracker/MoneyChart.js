import React, { useRef, useEffect } from 'react';
import { select, arc, pie, scaleOrdinal, schemeSet3, interpolate } from 'd3';

import useResizeObserver from '../hooks/useResizeObserver';

export const MoneyChart = ({ data }) => {
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const svg = select(svgRef.current);

    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    const arcGenerator = arc()
      .innerRadius(75)
      .outerRadius(150);

    const pieGenerator = pie()
      .sort(null)
      .value(data => data.cost);

    const colorScale = scaleOrdinal(schemeSet3);

    const arcTweenEnter = data => {
      const i = interpolate(data.endAngle, data.startAngle);
      return function(t) {
        data.startAngle = i(t);
        return arcGenerator(data);
      };
    };

    svg
      .selectAll('.slice')
      .data(pieGenerator(data))
      .join('path')
      .attr('class', 'slice')
      // .attr('d', arcGenerator) if do not require animation
      .attr('stroke', '#424242')
      .attr('stroke-width', 3)
      .attr('fill', slice => colorScale(slice.data.name))
      .style('transform', `translate(${width / 2}px, ${height}px)`)
      .transition()
      .duration(750)
      .attrTween('d', arcTweenEnter);
  }, [data, dimensions]);

  return (
    <div className="svg-wrapper" ref={wrapperRef}>
      <svg className="basics-svg" ref={svgRef} />
    </div>
  );
};
