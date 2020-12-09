import React, { useEffect, useState } from 'react';

import { fetchDummyData } from '@/utils';
import Header from '.';

const desc = {
  component: Header,
  title: 'molecules/Header',
};

export const Default = (): JSX.Element => {
  const [page, setPage] = useState(null);
  useEffect(() => {
    (async () => {
      setPage(await fetchDummyData('1'));
    })();
  });
  return <Header page={page} />;
};

export const MenuOpened = (): JSX.Element => {
  const [page, setPage] = useState(null);
  useEffect(() => {
    (async () => {
      setPage(await fetchDummyData('1'));
    })();
  }, []);
  return <Header page={page} />;
};

export default desc;
