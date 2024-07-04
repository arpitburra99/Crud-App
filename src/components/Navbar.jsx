import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant='h5' sx={{ flexGrow: 1 }} textAlign={'center'}>
          <NavLink style={{ textDecoration: 'none', color: 'black' }} to={'/'}>
            Redux Crud App
          </NavLink>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
