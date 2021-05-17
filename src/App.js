import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { Box, ChakraProvider, Flex } from '@chakra-ui/react';
import { createBrowserHistory } from 'history';

import {
  Kanban,
  Header,
  GithubAuth,
  ProjectSelect,
  Gitgraph,
  Performance,
} from './components';
import { UserProvider } from './context/UserContext';

const history = createBrowserHistory();

function App() {
  return (
    <ChakraProvider>
      <Flex direction="column" maxH="100vh" maxW="100vw" h="100vh" w="100vw">
        <Router history={history}>
          <UserProvider>
            <Box>
              <Header flex="0 1" />
            </Box>
            <Box flex="1">
              <Switch>
                <Route path="/authenticate/github">
                  <GithubAuth />
                </Route>
                <Route path="/" exact>
                  <ProjectSelect />
                </Route>
                <Route path="/:owner/:repo">
                  <Flex h="100%">
                    <Box flex="2">
                      <Box mb={4}>
                        <Kanban history={history} />
                      </Box>
                      <Performance />
                    </Box>
                    <Box flex="1">
                      <Gitgraph history={history} />
                    </Box>
                  </Flex>
                </Route>
                <Redirect to="/" />
              </Switch>
            </Box>
          </UserProvider>
        </Router>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
