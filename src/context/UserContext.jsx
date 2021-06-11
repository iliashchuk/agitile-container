import React, { createContext, useCallback, useEffect, useState } from 'react';
import { Octokit } from '@octokit/rest';

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();

  // test comment

  const getUser = useCallback((githubToken) => {
    const getUser = async () => {
      const authenticatedOcto = new Octokit({ auth: githubToken });
      const userResponse = await authenticatedOcto.rest.users.getAuthenticated();

      setUser(userResponse.data);
    };
    getUser();
  });

  useEffect(() => {
    const githubToken = localStorage.getItem('github-token');
    if (githubToken) {
      getUser(githubToken);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        onLogin: (githubToken) => getUser(githubToken),
        onLogout: () => setUser(undefined),
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
