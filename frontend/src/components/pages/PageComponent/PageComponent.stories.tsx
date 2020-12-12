import React, { useEffect, useState } from 'react';

import { fetchDummyData } from '@/utils';
import PageComponent from '.';

const desc = {
  component: PageComponent,
  title: 'pages/PageComponent',
};

export const Default = (): JSX.Element => {
  const [loadedPage, setPage] = useState(null);
  useEffect(() => {
    (async () => {
      const { page } = await fetchDummyData();
      setPage(page);
    })();
  });
  return <PageComponent page={loadedPage} menuClosed />;
};

export default desc;
