import React from 'react';
import Header from './components/Header';

const App = ({ title="123", color="#000" }) => (
  <div style={{ margin: '20px' }}>
    <Header title={title} color={color} />
  </div>
);

export default App;
