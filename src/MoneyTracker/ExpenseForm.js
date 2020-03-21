import React from 'react';

export const ExpenseForm = () => {
  return (
    <form className="card z-depth-0">
      <div className="card-content">
        <span className="card-title indigo-text">Add Item:</span>
        <div className="input-field">
          <input type="text" id="name" />
          <label htmlFor="name">Item Name</label>
        </div>
        <div className="input-field">
          <input type="text" id="cost" />
          <label htmlFor="name">Item Cost (EUR)</label>
        </div>
        <div className="input-field center">
          <button className="btn-large pink white-text">Add Item</button>
        </div>
        <div className="input-field center">
          <p className="red-text" id="error"></p>
        </div>
      </div>
    </form>
  );
};
