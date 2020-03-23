import React, { useState } from 'react';

import GeoChart from './GeoChart';
import data from './data/GeoChart.world.geo.json';
import './Geo.css';

const Geo = () => {
  const [property, setProperty] = useState('pop_est');

  return (
    <section className="geo">
      <h2>World Map with d3-geo</h2>

      <GeoChart data={data} property={property} />

      <h2>Select property to highlight</h2>
      <select
        value={property}
        onChange={event => setProperty(event.target.value)}
      >
        <option value="pop_est">Population</option>
        <option value="name_len">Name length</option>
        <option value="gdp_md_est">GDP</option>
      </select>
    </section>
  );
};

export default Geo;
