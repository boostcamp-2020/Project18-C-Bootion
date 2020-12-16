/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';

import { Header, Title, Editor } from '@components/molecules';
import { HeaderMenu } from '@components/organisms';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { blockMapState, pageState, staticMenuToggleState } from '@/stores';
import { createBlock } from '@/utils';
import styled from '@emotion/styled';
import { animated, useSpring } from 'react-spring';

const staticMenuAreaCss = css`
  position: fixed;
  z-index: 2;
`;
const AnimatedStaticHeaderArea = styled(animated.div)`
  position: fixed;
  right: 0;
  background-color: #ffffff;
  z-index: 1;
`;
const AnimatedStaticScrollArea = styled(animated.div)`
  position: fixed;
  top: 45px;
  right: 0;
  background-color: #ffffff;
  height: calc(100% - 45px);
  overflow: auto;
`;
const bottomMarginCss = css`
  display: inline-block;
  width: 100%;
  height: calc(100% - 200px);
  min-height: 200px;
`;

function PageComponent(): JSX.Element {
  const staticMenuToggle = useRecoilValue(staticMenuToggleState);
  const page = useRecoilValue(pageState);
  const setBlockMap = useSetRecoilState(blockMapState);
  const staticAreaStyleProps = useSpring({
    left: staticMenuToggle ? 240 : 0,
    width: `calc(100% - ${staticMenuToggle ? 240 : 0}px)`,
  });

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
      <div css={staticMenuAreaCss}>
        <HeaderMenu />
      </div>
      <AnimatedStaticHeaderArea style={staticAreaStyleProps}>
        <Header />
      </AnimatedStaticHeaderArea>
      <AnimatedStaticScrollArea style={staticAreaStyleProps}>
        <Title />
        <Editor />
        <div
          css={bottomMarginCss}
          onClick={createBlockHandler}
          onKeyUp={createBlockHandler}
        />
      </AnimatedStaticScrollArea>
    </div>
  );
}

export default PageComponent;
