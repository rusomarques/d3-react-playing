import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const NavigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/basics">Basics</NavigationItem>
    <NavigationItem link="/racing">Racing</NavigationItem>
    <NavigationItem link="/tree">Tree</NavigationItem>
    <NavigationItem link="/timeline">Timeline</NavigationItem>
  </ul>
);

export default NavigationItems;
