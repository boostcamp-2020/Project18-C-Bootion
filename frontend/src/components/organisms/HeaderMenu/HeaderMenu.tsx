/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css, SerializedStyles } from '@emotion/react';
import { useState } from 'react';

import { HeaderButton } from '@components/atoms';
import { Menu } from '@components/molecules';
import { ReactComponent as HamburgerMenu } from '@assets/hamburgerMenu.svg';
import { ReactComponent as DoubleChevronRight } from '@assets/doubleChevronRight.svg';

const wrapperCss = (isMenuClosed: boolean): SerializedStyles => css`
  position: relative;
  display: ${isMenuClosed ? 'flex' : 'none'};
  align-items: center;
  line-height: 1.2;
  font-size: 14px;
  width: 45px;
  height: 45px;
  flex-grow: 0;
  margin-right: 8px;
  min-width: 0;
`;
const hoverAreaCss = (): SerializedStyles => css`
  position: absolute;
  display: inline-block;
  top: 45px;
  left: 0;
  width: 100%;
  height: 100vh;
`;
const menuCss = (): SerializedStyles => css`
  position: absolute;
  display: inline-block;
  top: 50px;
  left: 0;
  margin-top: 10px;
`;

interface Props {
  isMenuClosed: boolean;
}

function HeaderMenu({ isMenuClosed }: Props): JSX.Element {
  const [menuClosed, setMenuClosed] = useState<boolean>(isMenuClosed);
  const [menuHovered, setMenuHorvered] = useState<boolean>(false);
  return (
    <div
      css={wrapperCss(isMenuClosed)}
      onMouseEnter={() => setMenuHorvered(true)}
      onMouseLeave={() => setMenuHorvered(false)}
    >
      <HeaderButton>
        {!menuHovered ? <HamburgerMenu /> : <DoubleChevronRight />}
      </HeaderButton>
      <div css={hoverAreaCss()} />
      {menuHovered && (
        <div css={menuCss()}>
          <Menu />
        </div>
      )}
    </div>
  );
}

export default HeaderMenu;
