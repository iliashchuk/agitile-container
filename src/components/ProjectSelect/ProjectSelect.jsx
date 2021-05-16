import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Input } from '@chakra-ui/input';
import { Link } from 'react-router-dom';
import { Container, Heading, Text } from '@chakra-ui/layout';
import { Button, VStack, Link as UILink } from '@chakra-ui/react';
import { Octokit } from '@octokit/rest';
import { UserContext } from '../../context/UserContext';

const octokit = new Octokit();

export const ProjectSelect = () => {
  const [requestedUsername, setRequestedUsername] = useState('');
  const [userRepos, setUserRepos] = useState();
  const [username, setUsername] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user?.login) {
      setUsername(user.login);
    }
  }, [user]);

  const getUserRepos = useCallback(async () => {
    setRequestedUsername(username);
    const response = await octokit.rest.repos
      .listForUser({
        username,
      })
      .catch(() => {
        setUserRepos([]);
      });

    if (response && response.status === 200) {
      setUserRepos(response.data);
    }
  }, [username]);

  const handleSelectUser = () => {
    getUserRepos();
  };

  const UserSelect = (
    <>
      <Heading mb={2}>Enter Github user to pick a repository</Heading>
      <Input
        mb={2}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      ></Input>
      <Button onClick={handleSelectUser}>Select</Button>
    </>
  );

  if (!userRepos) {
    return (
      <Container p={4} textAlign="center">
        {UserSelect}
      </Container>
    );
  }

  return (
    <Container p={4} textAlign="center">
      {UserSelect}
      {userRepos.length ? (
        <>
          <Text mb={2} mt={4} fontWeight="bold">
            Repositories by {requestedUsername}
          </Text>
          <VStack spacing={2}>
            {userRepos.map((repo) => {
              return (
                <Link key={repo.id} to={`/${username}/${repo.name}`}>
                  <UILink as="p">{repo.name}</UILink>
                </Link>
              );
            })}
          </VStack>
        </>
      ) : (
        <Text>
          No public repositories found for {requestedUsername}, select another
          user.
        </Text>
      )}
    </Container>
  );
};
