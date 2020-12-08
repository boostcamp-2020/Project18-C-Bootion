import React, { useEffect, useState } from 'react';

import { fetchDummyData } from '@/utils';
import Editor from '.';

const desc = {
  component: Editor,
  title: 'molecules/Editor',
};

export const Default = (): JSX.Element => {
  const [page, setPage] = useState(null);
  useEffect(() => {
    (async () => {
      setPage(await fetchDummyData('1'));
    })();
  });
  return <Editor {...{ page }} />;
};

export default desc;
