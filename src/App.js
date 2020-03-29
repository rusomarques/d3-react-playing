import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';
import { Tree } from './Tree/Tree';
import { TimeLine } from './TimeLine/TimeLine';
import { Racing } from './Racing/Racing';
import { MoneyTracker } from './MoneyTracker/MoneyTracker';
import { Basics } from './Basics/Basics';
import Layout from './Layout/Layout';
import Geo from './Geo/Geo';
import Brush from './Brush/Brush';
import Stack from './StackBar/Stack';
import Zoom from './Zoom/Zoom';

function App() {
  const routes = (
    <Switch>
      <Route path="/basics" exact component={Basics} />
      <Route path="/brush" exact component={Brush} />
      <Route path="/zoom" exact component={Zoom} />
      <Route path="/stack" exact component={Stack} />
      <Route path="/geo" exact component={Geo} />
      <Route path="/racing" component={Racing} />
      <Route path="/timeline" component={TimeLine} />
      <Route path="/tree" component={Tree} />
      <Route path="/money-tracker" component={MoneyTracker} />
      <Redirect to="/basics" />
    </Switch>
  );
  return <Layout>{routes}</Layout>;
}

export default App;
