import React, { useEffect, useState } from 'react';

import { fetchDummyData } from '@/utils';
import PageComponent from '.';

const desc = {
  component: PageComponent,
  title: 'pages/PageComponent',
};

export const Default = (): JSX.Element => {
  const [page, setPage] = useState(null);
  useEffect(() => {
    (async () => {
      setPage(await fetchDummyData('1'));
    })();
  });
  return <PageComponent page={page} menuClosed />;
};

export default desc;
