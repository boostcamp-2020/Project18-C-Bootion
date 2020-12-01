import React, { useEffect, useState } from 'react';

import { getPage } from '@/utils';
import PageComponent from '.';

const desc = {
  component: PageComponent,
  title: 'pages/PageComponent',
};

export const Default = (): JSX.Element => {
  const [page, setPage] = useState(null);
  useEffect(() => {
    (async () => {
      setPage(await getPage('1'));
    })();
  });
  return <PageComponent page={page} menuClosed />;
};

export default desc;
