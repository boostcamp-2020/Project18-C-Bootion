import React, { useEffect, useState } from 'react';

import { fetchDummyData } from '@/utils';
import BlockComponent from '.';

const desc = {
  component: BlockComponent,
  title: 'Atoms/Block',
};

export const Default = (): JSX.Element => {
  const [block, setBlock] = useState(null);
  useEffect(() => {
    (async () => {
      setBlock((await fetchDummyData('1')).blockList[0]);
    })();
  });

  return <BlockComponent blockDTO={block} />;
};

export const HasDescendants = (): JSX.Element => {
  const [block, setBlock] = useState(null);
  useEffect(() => {
    (async () => {
      setBlock((await fetchDummyData('1')).blockList[1]);
    })();
  });
  return <BlockComponent blockDTO={block} />;
};

export const Grid = (): JSX.Element => {
  const [block, setBlock] = useState(null);
  useEffect(() => {
    (async () => {
      setBlock((await fetchDummyData('1')).blockList[2]);
    })();
  });
  return <BlockComponent blockDTO={block} />;
};

export default desc;
