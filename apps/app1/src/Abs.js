import React from 'react';
import { Outlet } from 'shared/react-router-dom';

const Abs = () =>{
  return (
  <div style={{ margin: '20px' }} key={JSON.stringify(Math.random())}>
    Jy
    <Outlet />
  </div>
)};

export default Abs;
