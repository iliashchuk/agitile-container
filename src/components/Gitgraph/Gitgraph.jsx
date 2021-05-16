import React from 'react';

import { Microfrontend } from '../Microfrontend';

// eslint-disable-next-line no-undef
const { REACT_APP_GITGRAPH_HOST: gitgraphHost } = process.env;

export const Gitgraph = ({ history }) => {
  return (
    <Microfrontend
      type="js"
      history={history}
      name="Gitgraph"
      host={gitgraphHost}
    ></Microfrontend>
  );
};
