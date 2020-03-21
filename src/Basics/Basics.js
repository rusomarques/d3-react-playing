import React, { useState } from 'react';

import { Circles } from './Circles/Circles';
import Lines from './Lines/Lines';
import './Basics.css';
import Bars from './Bars/Bars';
import { Buttons } from './Buttons/Buttons';

const initialData = [25, 30, 45, 120, 60, 20, 100];

export const Basics = () => {
  const [data, setData] = useState(initialData);

  return (
    <section className="basics">
      <Buttons data={data} setData={setData} />
      <Bars data={data} />
      <Lines data={data} />
      <Circles data={data} />
    </section>
  );
};
