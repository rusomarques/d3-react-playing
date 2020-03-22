import React from 'react';

import classes from './Layout.module.css';
import NavBar from './NavBar/NavBar';

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <main className={classes.Content}>{children}</main>
    </>
  );
};

export default Layout;
