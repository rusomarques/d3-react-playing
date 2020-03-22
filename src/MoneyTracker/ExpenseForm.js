import React, { useState } from 'react';

export const ExpenseForm = ({ onAddItem }) => {
  const [name, setName] = useState('');
  const [cost, setCost] = useState(0);
  const [error, setError] = useState(null);

  const clearForm = () => {
    setName('');
    setCost(0);
    setError(null);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!name || !cost) {
      setError('Please fill Item name and cost');
    } else {
      onAddItem({
        cost,
        name
      });

      clearForm();
    }
  };

  return (
    <form className="form">
      <div className="form-content">
        <span className="form-title">Add Item:</span>
        <div className="input-field">
          <label className="form-label">Name</label>
          <input
            className="form-input"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label className="form-label">Cost</label>
          <input
            className="form-input"
            type="number"
            value={cost}
            onChange={e => setCost(e.target.value)}
          />
        </div>

        <button className="form-button" onClick={handleSubmit}>
          Add Item
        </button>

        {error && (
          <div className="form-error">
            <p className="red-text">{error}</p>
          </div>
        )}
      </div>
    </form>
  );
};
