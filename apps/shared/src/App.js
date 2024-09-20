import React from 'react';

export default () => (
  <div style={{margin: '20px'}}>
    <React.Suspense fallback='Loading header...'>
      <HeaderApp1 title="Title App 2" color="#bf41b7" />
    </React.Suspense>
  </div>
);

