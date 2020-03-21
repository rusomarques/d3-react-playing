import React from 'react';
import { Button } from './Button';

export const Buttons = ({ setData, data }) => (
  <section className="basics-buttons">
    <Button
      label="UPDATE"
      onClickHandler={() => setData(data.map(item => item + 5))}
    />
    <Button
      label="FILTER"
      onClickHandler={() => setData(data.filter(item => item < 50))}
    />
    <Button
      label="ADD"
      onClickHandler={() =>
        setData([...data, Math.floor(Math.random() * 135 + 1)])
      }
    />
  </section>
);
