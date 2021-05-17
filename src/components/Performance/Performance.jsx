import React from 'react';

import { Microfrontend } from '../Microfrontend';

// eslint-disable-next-line no-undef
const { REACT_APP_PERFORMANCE_HOST: PerformanceHost } = process.env;

export const Performance = ({ history }) => {
  return (
    <Microfrontend
      type="js"
      history={history}
      name="Performance"
      host={PerformanceHost}
    ></Microfrontend>
  );
};
