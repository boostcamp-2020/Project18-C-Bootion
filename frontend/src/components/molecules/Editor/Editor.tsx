/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';

import { Block } from '@/schemes';
import { BlockComponent } from '@components/molecules';
import { useRecoilValue } from 'recoil';
import { pageState } from '@/stores';

const wrapperCss = () => css`
  padding-left: calc(96px + env(safe-area-inset-left));
  padding-right: calc(96px + env(safe-area-inset-right));
  max-width: 100%;
  width: 900px;
  margin: auto;
`;

interface Props {}

function Editor({}: Props): JSX.Element {
  const page = useRecoilValue(pageState('1'));

  return (
    <div css={wrapperCss()}>
      {page?.blockList.map((block: Block) => (
        <BlockComponent key={block.id} blockDTO={block} />
      ))}
    </div>
  );
}

export default Editor;
