import React from 'react';

import PageComponent from '.';

const desc = {
  component: PageComponent,
  title: 'pages/PageComponent',
};

export const Default = (): JSX.Element => {
  return <PageComponent />;
};

export default desc;
