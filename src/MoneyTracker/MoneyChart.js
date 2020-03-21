import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

export const MoneyChart = ({ expenses, data }) => {
  // console.log(expenses);

  /* The useRef Hook creates a variable that "holds on" to a value across rendering
       passes. In this case it will hold our component's SVG DOM element. It's
       initialized null and React will assign it later (see the return statement) */
  const d3Container = useRef(null);

  /* The useEffect Hook is for running side effects outside of React,
          for instance inserting elements into the DOM using D3 */
  useEffect(() => {}, []);

  return (
    <svg className="d3-component" width={400} height={200} ref={d3Container} />
  );
};
