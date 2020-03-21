import React from 'react';

import './App.css';
import { TimeLine } from './TimeLine/TimeLine';
import { Racing } from './Racing/Racing';
// import { MoneyTracker } from './MoneyTracker/MoneyTracker';
// import { Basics } from './Basics/Basics';

function App() {
  return (
    <section className="App">
      {/*  <MoneyTracker /> */}
      {/* <Basics /> */}
      {/* <TimeLine /> */}
      <Racing />
    </section>
  );
}

export default App;
