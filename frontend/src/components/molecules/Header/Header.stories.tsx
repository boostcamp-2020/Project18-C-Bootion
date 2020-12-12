import React, { useEffect, useState } from 'react';

import { fetchDummyData } from '@/utils';
import Header from '.';

const desc = {
  component: Header,
  title: 'molecules/Header',
};

export const Default = (): JSX.Element => {
  const [loadedPage, setPage] = useState(null);
  useEffect(() => {
    (async () => {
      const { page } = await fetchDummyData();
      setPage(page);
    })();
  });
  return <Header page={loadedPage} menuClosed />;
};

export const MenuOpened = (): JSX.Element => {
  const [loadedPage, setPage] = useState(null);
  useEffect(() => {
    (async () => {
      const { page } = await fetchDummyData();
      setPage(page);
    })();
  });
  return <Header page={loadedPage} menuClosed={false} />;
};

export default desc;
