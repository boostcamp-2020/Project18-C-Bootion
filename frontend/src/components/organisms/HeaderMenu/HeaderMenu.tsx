/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';
import { useRecoilState } from 'recoil';

import { HeaderButton } from '@components/atoms';
import { ReactComponent as HamburgerMenu } from '@assets/hamburgerMenu.svg';
import { ReactComponent as DoubleChevronRight } from '@assets/doubleChevronRight.svg';
import { hoveredMenuToggleState, staticMenuToggleState } from '@/stores';
import { Menu } from '@molecules/index';

const wrapperCss = () => css`
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
const hoverAreaCss = () => css`
  position: absolute;
  display: inline-block;
  top: 45px;
  left: 0;
  width: 100%;
  height: 100vh;
`;
const menuCss = (staticMenuToggle: boolean) => css`
  position: absolute;
  display: inline-block;
  top: ${staticMenuToggle ? 0 : 50}px;
  left: 0;
  margin-top: ${staticMenuToggle ? 0 : 10}px;
`;

interface Props {}

function HeaderMenu({}: Props): JSX.Element {
  const [staticMenuToggle, setStaticMenuToggle] = useRecoilState(
    staticMenuToggleState,
  );
  const [hoveredMenuToggle, setHoveredMenuToggle] = useRecoilState(
    hoveredMenuToggleState,
  );

  return (
    <div
      css={wrapperCss()}
      onMouseEnter={() => setHoveredMenuToggle(true)}
      onMouseLeave={() => setHoveredMenuToggle(false)}
    >
      <HeaderButton handleClick={() => setStaticMenuToggle(!staticMenuToggle)}>
        {staticMenuToggle ||
          (!hoveredMenuToggle ? <HamburgerMenu /> : <DoubleChevronRight />)}
      </HeaderButton>
      <div css={hoverAreaCss()} />
      {(staticMenuToggle || hoveredMenuToggle) && (
        <div css={menuCss(staticMenuToggle)}>
          <Menu />
        </div>
      )}
    </div>
  );
}

export default HeaderMenu;
