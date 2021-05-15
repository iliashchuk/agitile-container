import React, { useContext, useEffect, useState } from 'react';
import queryString from 'query-string';
import {
  Avatar,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Box,
} from '@chakra-ui/react';
import { Flex, Text } from '@chakra-ui/layout';
import { Redirect, useLocation } from 'react-router';
import axios from 'axios';

import { ReactComponent as GithubLogo } from './github-logo.svg';
import { UserContext } from '../../context/UserContext';

const {
  REACT_APP_GITHUB_APP_ID,
  REACT_APP_APP_HOST,
  // eslint-disable-next-line no-undef
} = process.env;

const GITHUB_TOKEN_STORAGE_KEY = 'github-token';

const params = queryString.stringify({
  client_id: REACT_APP_GITHUB_APP_ID,
  redirect_uri: `${REACT_APP_APP_HOST}authenticate/github`,
  scope: ['repo', 'user'].join(' '), // space seperated string
  allow_signup: true,
});

const githubLoginUrl = `https://github.com/login/oauth/authorize?${params}`;

const getAccessTokenFromCode = async (code) => {
  const { data } = await axios({
    url: 'http://localhost:4000/github-token',
    method: 'post',
    data: {
      code,
    },
  });
  /**
   * GitHub returns data as a string we must parse.
   */
  return data;
};

export const GithubAuth = () => {
  const { search } = useLocation();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState();
  const { onLogin } = useContext(UserContext);

  const { code } = search && queryString.parse(search);

  useEffect(() => {
    if (code) {
      const retrieveGithubToken = async () => {
        try {
          const token = await getAccessTokenFromCode(code);
          console.log('got code!');
          localStorage.setItem(GITHUB_TOKEN_STORAGE_KEY, token);
          onLogin(token);
        } catch (e) {
          setSuccess(false);
          setLoading(false);
          return;
        }
        setSuccess(true);
        setLoading(false);
      };
      retrieveGithubToken();
    }
  }, []);

  if (!code) {
    return null;
  }

  if (loading) {
    return (
      <Text>
        Retrieving access token from <b>Github</b>...
      </Text>
    );
  }

  if (!success) {
    return (
      <Text>
        Failed to retrieve access token from <b>Github</b>.
      </Text>
    );
  }
  return <Redirect to="/" />;
};

export const GithubAuthButton = () => {
  const { user, onLogout } = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem(GITHUB_TOKEN_STORAGE_KEY);
    onLogout();
  };

  if (user) {
    return (
      <Box>
        <Menu>
          <MenuButton>
            <Flex align="center" cursor="pointer">
              <Text fontSize="large" mr={2}>
                {user.login}
              </Text>
              <Avatar size="md" name={user.login} src={user.avatar_url} />
            </Flex>
          </MenuButton>
          <MenuList onClick={logout}>
            <MenuItem>Logout from {user.login}</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    );
  }
  return (
    <Link
      color="ButtonText"
      textDecoration="none"
      href={githubLoginUrl}
      isExternal
    >
      <Flex align="center" cursor="pointer">
        <Text fontSize="large" mr={2}>
          {user ? user.login : 'Login'}
        </Text>
        {user ? (
          <Avatar size="md" name={user.login} src={user.avatar_url} />
        ) : (
          <GithubLogo height="48px" width="48px" />
        )}
      </Flex>
    </Link>
  );
};
