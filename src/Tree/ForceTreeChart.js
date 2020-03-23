import React, { useRef, useEffect } from 'react';
import {
  select,
  hierarchy,
  forceSimulation,
  // forceCenter,
  forceManyBody,
  mouse,
  forceCollide,
  forceX,
  forceY,
  forceRadial
} from 'd3';

import useResizeObserver from '../hooks/useResizeObserver';

const ForceTreeChart = ({ data }) => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const svg = select(svgRef.current);

    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    /* Centering workaround */
    svg.attr('viewBox', [-width / 2, -height / 2, width, height]);

    const root = hierarchy(data);
    const nodeData = root.descendants();
    const linkData = root.links();

    const simulation = forceSimulation(nodeData)
      // .force('center', forceCenter(width / 2, height / 2))
      .force('charge', forceManyBody().strength(-30))
      .force('collide', forceCollide(30))
      .on('tick', () => {
        /* Current alpha (text at left top corner) */
        svg
          .selectAll('.alpha')
          .data([data])
          .join('text')
          .attr('class', 'alpha')
          .text(simulation.alpha().toFixed(2))
          .attr('x', -width / 2 + 10)
          .attr('y', -height / 2 + 25);

        /* Links */
        svg
          .selectAll('.link')
          .data(linkData)
          .join('line')
          .attr('class', 'link')
          .attr('stroke', 'black')
          .attr('fill', 'none')
          .attr('x1', link => link.source.x)
          .attr('y1', link => link.source.y)
          .attr('x2', link => link.target.x)
          .attr('y2', link => link.target.y);

        /* Nodes */
        svg
          .selectAll('.node')
          .data(nodeData)
          .join('circle')
          .attr('class', 'node')
          .attr('r', 4)
          .attr('cx', node => node.x)
          .attr('cy', node => node.y);

        /* Lables */
        svg
          .selectAll('.label')
          .data(nodeData)
          .join('text')
          .attr('class', 'label')
          .attr('text-anchor', 'middle')
          .attr('font-size', 20)
          .text(node => node.data.name)
          .attr('x', node => node.x)
          .attr('y', node => node.y);
      });

    /* Apply force on mosemouve */
    svg.on('mousemove', () => {
      const [x, y] = mouse(svgRef.current);
      simulation
        .force(
          'x',
          forceX(x).strength(node => 0.2 + node.depth * 0.15)
        )
        .force(
          'y',
          forceY(y).strength(node => 0.2 + node.depth * 0.15)
        );
    });

    /* Apply force on click */
    svg.on('click', () => {
      const [x, y] = mouse(svgRef.current);
      simulation
        .alpha(0.5)
        .restart()
        .force('orbit', forceRadial(100, x, y).strength(0.8));

      /* Render a circle to show radial force */
      svg
        .selectAll('.orbit')
        .data([data])
        .join('circle')
        .attr('class', 'orbit')
        .attr('stroke', 'green')
        .attr('fill', 'none')
        .attr('r', '100')
        .attr('cx', x)
        .attr('cy', y);
    });
  }, [data, dimensions]);

  return (
    <div className="svg-wrapper" ref={wrapperRef}>
      <svg
        className="basics-svg"
        ref={svgRef}
        style={{ backgroundColor: '#eee', height: '250px' }}
      />
    </div>
  );
};

export default ForceTreeChart;
