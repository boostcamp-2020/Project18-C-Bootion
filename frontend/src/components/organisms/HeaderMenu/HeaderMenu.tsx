/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { HeaderButton } from '@components/atoms';
import { Menu } from '@components/molecules';
import { ReactComponent as HamburgerMenu } from '@assets/hamburgerMenu.svg';
import { ReactComponent as DoubleChevronRight } from '@assets/doubleChevronRight.svg';
import { staticMenuToggleState } from '@/stores';

const wrapperCss = (staticMenuToggle: boolean) => css`
  position: relative;
  display: ${staticMenuToggle ? 'none' : 'flex'};
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
const menuCss = () => css`
  position: absolute;
  display: inline-block;
  top: 50px;
  left: 0;
  margin-top: 10px;
`;

interface Props {}

function HeaderMenu({}: Props): JSX.Element {
  const staticMenuToggle = useRecoilValue(staticMenuToggleState);
  const [menuHovered, setMenuHovered] = useState<boolean>(false);

  return (
    <div
      css={wrapperCss(staticMenuToggle)}
      onMouseEnter={() => staticMenuToggle || setMenuHovered(true)}
      onMouseLeave={() => staticMenuToggle || setMenuHovered(false)}
    >
      <HeaderButton>
        {staticMenuToggle ||
          (!menuHovered ? <HamburgerMenu /> : <DoubleChevronRight />)}
      </HeaderButton>
      <div css={hoverAreaCss()} />
      {(staticMenuToggle || menuHovered) && (
        <div css={menuCss()}>
          <Menu />
        </div>
      )}
    </div>
  );
}

export default HeaderMenu;
