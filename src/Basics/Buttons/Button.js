import React from 'react';

export const Button = ({ onClickHandler, label }) => (
  <button type="button" className="basics-button" onClick={onClickHandler}>
    {label}
  </button>
);
