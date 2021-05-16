import React from 'react';

import { Microfrontend } from '../Microfrontend';

// eslint-disable-next-line no-undef
const { REACT_APP_KANBAN_HOST: kanbanHost } = process.env;

export const Kanban = ({ history }) => {
  return (
    <Microfrontend
      type="react"
      history={history}
      name="Kanban"
      host={kanbanHost}
    ></Microfrontend>
  );
};
