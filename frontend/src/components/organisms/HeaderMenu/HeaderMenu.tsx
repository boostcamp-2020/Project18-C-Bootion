/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import { animated, useSpring, useTransition } from 'react-spring';

import { HeaderButton } from '@components/atoms';
import { ReactComponent as HamburgerMenu } from '@assets/hamburgerMenu.svg';
import { ReactComponent as DoubleChevronRight } from '@assets/doubleChevronRight.svg';
import { hoveredMenuToggleState, staticMenuToggleState } from '@/stores';
import { Menu } from '@molecules/index';

const wrapperCss = css`
  position: relative;
  display: flex;
  align-items: center;
  line-height: 1.2;
  font-size: 14px;
  width: 45px;
  height: 45px;
  flex-grow: 0;
  margin-right: 8px;
  min-width: 0;
`;
const hoverAreaCss = css`
  position: absolute;
  display: inline-block;
  top: 45px;
  left: 0;
  width: 100%;
  height: 100vh;
`;
const AnimatedMenu = styled(animated.div)`
  position: absolute;
  display: inline-block;
`;

function HeaderMenu(): JSX.Element {
  const [staticMenuToggle, setStaticMenuToggle] = useRecoilState(
    staticMenuToggleState,
  );
  const [hoveredMenuToggle, setHoveredMenuToggle] = useRecoilState(
    hoveredMenuToggleState,
  );
  const menuStyleProps = useSpring({
    top: staticMenuToggle ? 0 : 50,
    left: hoveredMenuToggle || staticMenuToggle ? 0 : -240,
    opacity: hoveredMenuToggle || staticMenuToggle ? 1 : 0,
    marginTop: staticMenuToggle ? 0 : 10,
  });

  return (
    <div
      css={wrapperCss}
      onMouseEnter={() => setHoveredMenuToggle(true)}
      onMouseLeave={() => setHoveredMenuToggle(false)}
    >
      <HeaderButton clickHandler={() => setStaticMenuToggle(!staticMenuToggle)}>
        {staticMenuToggle ||
          (!hoveredMenuToggle ? <HamburgerMenu /> : <DoubleChevronRight />)}
      </HeaderButton>
      <div css={hoverAreaCss} />
      <AnimatedMenu style={menuStyleProps}>
        <Menu />
      </AnimatedMenu>
    </div>
  );
}

export default HeaderMenu;
