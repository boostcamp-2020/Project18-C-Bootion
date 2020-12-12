import React, { useEffect, useState } from 'react';

import { fetchDummyData } from '@/utils';
import Editor from '.';

const desc = {
  component: Editor,
  title: 'molecules/Editor',
};

export const Default = (): JSX.Element => {
  const [loadedPage, setPage] = useState(null);
  useEffect(() => {
    (async () => {
      const { page } = await fetchDummyData();
      setPage(page);
    })();
  });
  return <Editor {...{ page: loadedPage }} />;
};

export default desc;
