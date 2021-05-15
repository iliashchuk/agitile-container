import React from 'react';

// eslint-disable-next-line no-undef
const { REACT_APP_GITGRAPH_HOST: gitgraphHost } = process.env;

export const Gitgraph = () => {
  return <iframe src={gitgraphHost} frameBorder={0} />;
};
