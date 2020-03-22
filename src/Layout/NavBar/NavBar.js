import React from 'react';

import NavigationItems from './NavigationItems/NavigationItems';
import classes from './NavBar.module.css';

const NavBar = () => (
  <header className={classes.NavBar}>
    <nav>
      <NavigationItems />
    </nav>
  </header>
);

export default NavBar;
