import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Gitgraph, Kanban, Header, GithubAuth } from './components';
import { UserProvider } from './context/UserContext';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <UserProvider>
          <Header />
          <Switch>
            <Route path="/authenticate/github">
              <GithubAuth />
            </Route>
            <Route path="/" exact></Route>
          </Switch>
          <div style={{ display: 'flex', height: '80vh' }}>
            {/* <Kanban style={{ width: '70vw' }} /> */}
            {/* <Gitgraph style={{ maxHeight: '100%' }} /> */}
          </div>
        </UserProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
