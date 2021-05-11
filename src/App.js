import React from 'react';
import { Gitgraph } from './components/Gitgraph';

import { Kanban } from './components/Kanban';

function App() {
  return (
    <div>
      Container
      <div style={{ display: 'flex' }}>
        <Kanban />
        <Gitgraph />
      </div>
    </div>
  );
}

export default App;
