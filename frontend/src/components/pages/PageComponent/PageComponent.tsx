/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';

import { Header, Title, Editor, BlockModal } from '@components/molecules';
import { HeaderMenu } from '@components/organisms';
import { useRecoilValue } from 'recoil';
import { pageState, staticMenuToggleState, modalState } from '@/stores';
import { createBlock } from '@/utils';
import { useManager } from '@/hooks';
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
  const { isOpen } = useRecoilValue(modalState);
  const staticMenuToggle = useRecoilValue(staticMenuToggleState);
  const page = useRecoilValue(pageState);
  const [
    { children },
    { setBlock, startTransaction, commitTransaction, setFocus },
  ] = useManager(page.rootId);
  const staticAreaStyleProps = useSpring({
    left: staticMenuToggle ? 240 : 0,
    width: `calc(100% - ${staticMenuToggle ? 240 : 0}px)`,
  });

  const createBlockHandler = async () => {
    if (children[children.length - 1]?.value === '') {
      setFocus(children[children.length - 1]);
      return;
    }
    const { parent, block } = await createBlock({
      parentBlockId: page.rootId,
    });
    startTransaction();
    setBlock(parent.id, parent);
    setBlock(block.id, block);
    setFocus(block);
    commitTransaction();
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
        {isOpen ? <BlockModal /> : ''}
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
