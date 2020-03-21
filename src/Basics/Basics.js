import React from 'react';

import { Circles } from './Circles';
import Lines from './Lines';
import './Basics.css';
import Bars from './Bars';

export const Basics = () => {
  return (
    <div className="basics-wrapper">
      <Bars />
      <Lines />
      <Circles />
    </div>
  );
};
