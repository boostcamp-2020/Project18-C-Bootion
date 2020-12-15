/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';

import { Header, Title, Editor } from '@components/molecules';
import { HeaderMenu } from '@components/organisms';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { blockMapState, pageState, staticMenuToggleState } from '@/stores';
import { createBlock } from '@/utils';

const staticMenuAreaCss = () => css`
  position: fixed;
  z-index: 2;
`;
const staticHeaderAreaCss = (staticMenuToggle: boolean) => css`
  position: fixed;
  right: 0;
  left: ${staticMenuToggle ? 240 : 0}px;
  width: calc(100% - ${staticMenuToggle ? 240 : 0}px);
  background-color: #ffffff;
  z-index: 1;
`;
const staticScrollAreaCss = (staticMenuToggle: boolean) => css`
  position: fixed;
  top: 45px;
  right: 0;
  left: ${staticMenuToggle ? 240 : 0}px;
  width: calc(100% - ${staticMenuToggle ? 240 : 0}px);
  height: calc(100% - 45px);
  overflow: auto;
`;
const bottomMarginCss = () => css`
  display: inline-block;
  width: 100%;
  height: calc(100% - 200px);
  min-height: 200px;
`;

function PageComponent(): JSX.Element {
  const staticMenuToggle = useRecoilValue(staticMenuToggleState);
  const page = useRecoilValue(pageState);
  const setBlockMap = useSetRecoilState(blockMapState);

  const createBlockHandler = async () => {
    const { parent, block } = await createBlock({ parentBlockId: page.rootId });
    setBlockMap((prev) => {
      const next = { ...prev };
      next[parent.id] = parent;
      next[block.id] = block;
      return next;
    });
  };

  return (
    <div>
      <div css={staticMenuAreaCss()}>
        <HeaderMenu />
      </div>
      <div css={staticHeaderAreaCss(staticMenuToggle)}>
        <Header />
      </div>
      <div css={staticScrollAreaCss(staticMenuToggle)}>
        <Title />
        <Editor />
        <div
          css={bottomMarginCss()}
          onClick={createBlockHandler}
          onKeyUp={createBlockHandler}
        />
      </div>
    </div>
  );
}

export default PageComponent;
