import React, { useRef, useEffect, useState } from 'react';
import { select, scaleLinear, axisBottom, axisRight, scaleBand } from 'd3';

const Bars = () => {
  const [data, setData] = useState([25, 30, 45, 120, 60, 20, 100]);
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleBand()
      .domain(data.map((value, index) => index))
      .range([0, 300])
      .padding(0.3);
    const yScale = scaleLinear()
      .domain([0, 150])
      .range([150, 0]);

    const colorScale = scaleLinear()
      .domain([50, 80, 150]) // all values below 50 are green
      .range(['green', 'orange', 'red']);

    const xAxis = axisBottom(xScale)
      .ticks(data.length)
      .tickFormat(index => index + 1);
    const yAxis = axisRight(yScale);

    svg
      .select('.x-axis')
      .style('transform', 'translateY(150px)')
      .call(xAxis); // same as xAxis(svg.select('x-axis))

    svg
      .select('.y-axis')
      .style('transform', 'translateX(300px)')
      .call(yAxis); // same as xAxis(svg.select('x-axis))

    svg
      .selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .attr('x', (value, index) => xScale(index))
      // .attr('y', yScale) in order to apply transition, it is needed to fix on -150
      .style('transform', 'scale(1, -1)')
      .attr('y', -150)
      .attr('width', xScale.bandwidth())
      .on('mouseenter', (value, index) => {
        svg
          .selectAll('.tooltip')
          .data([data])
          .join(enter => enter.append('text').attr('y', yScale(value) - 4))
          .attr('class', 'tooltip')
          .text(value)
          .attr('x', xScale(index) + xScale.bandwidth() / 2)
          .attr('text-anchor', 'middle')
          .transition()
          .attr('y', yScale(value) - 8)
          .attr('opacity', 1);
      })
      .on('mouseleave', () => svg.selectAll('.tooltip').remove())
      .transition()
      .attr('fill', colorScale)
      .attr('height', value => 150 - yScale(value));
  }, [data]);

  return (
    <>
      <svg
        className="basics-svg"
        style={{ backgroundColor: '#eee', overflow: 'visible' }}
        width={300}
        height={150}
        ref={svgRef}
      >
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>

      <button
        type="button"
        className="basics-button"
        onClick={() => setData(data.map(item => item + 5))}
      >
        UPDATE
      </button>
      <button
        type="button"
        className="basics-button"
        onClick={() => setData(data.filter(item => item < 50))}
      >
        FILTER
      </button>
      <button
        type="button"
        className="basics-button"
        onClick={() => setData([...data, Math.floor(Math.random() * 135 + 1)])}
      >
        ADD
      </button>
    </>
  );
};

export default Bars;
