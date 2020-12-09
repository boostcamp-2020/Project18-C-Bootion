/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from '@emotion/react';
import { useEffect, useState } from 'react';

import { BlockComponent } from '@components/molecules';
import { fetchDummyData } from '@/utils';
import BlockHandler from '.';

const desc = {
  component: BlockHandler,
  title: 'Molecules/BlockHandler',
};

export const Default = (): JSX.Element => {
  const [block, setBlock] = useState(null);
  useEffect(() => {
    (async () => {
      setBlock((await fetchDummyData('1')).blockList[2]);
    })();
  });
  return (
    <div>
      <BlockComponent blockDTO={block} />
    </div>
  );
};

export default desc;
