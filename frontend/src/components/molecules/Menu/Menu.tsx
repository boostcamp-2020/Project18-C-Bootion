/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';
import { Suspense } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import {
  blockMapState,
  hoveredMenuToggleState,
  pagesState,
  pageState,
  staticMenuToggleState,
} from '@/stores';
import { createPage, readBlockMap } from '@/utils';
import { HeaderButton } from '@atoms/index';
import { ReactComponent as DoubleChevronLeft } from '@assets/doubleChevronLeft.svg';
import { ReactComponent as PlusPage } from '@assets/plusPage.svg';
import { MenuItem } from '@molecules/index';

const wrapperCss = (staticMenuToggle: boolean) => css`
  position: relative;
  width: 240px;
  height: ${staticMenuToggle ? 100 : 80}vh;
  border-radius: ${staticMenuToggle ? 0 : '3px'};
  background: ${staticMenuToggle ? 'rgb(247, 246, 243)' : '#ffffff'};
  ${staticMenuToggle ? '' : 'box-shadow: 0 0 10px 1px #aaaaaa'};
`;
const workspaceCss = () => css`
  display: flex;
  align-items: center;
  min-height: 24px;
  font-size: 14px;
  padding: 14px 14px 14px 15px;
  width: 100%;
  color: rgba(55, 53, 47, 0.6);
`;
const buttonsCss = () => css`
  position: absolute;
  top: 7px;
  right: 0;
  display: flex;
  align-items: center;
  line-height: 1.2;
  font-size: 14px;
  flex-grow: 0;
  margin-right: 8px;
  min-width: 0;
`;
const plusCss = () => css`
  margin-right: 5px;
  border: 1px solid rgba(55, 53, 47, 0.16);
  border-radius: 3px;
`;

interface Props {}

function Menu({}: Props): JSX.Element {
  const [pages, setPages] = useRecoilState(pagesState);
  const setSelectedPage = useSetRecoilState(pageState);
  const [staticMenuToggle, setStaticMenuToggle] = useRecoilState(
    staticMenuToggleState,
  );
  const [hoveredMenuToggle, setHoveredMenuToggle] = useRecoilState(
    hoveredMenuToggleState,
  );
  const setBlockMap = useSetRecoilState(blockMapState);

  const CreatingPageHandler = async () => {
    const { pages: updated, page: created } = await createPage();
    const { blockMap } = await readBlockMap(created.id);
    console.log({ blockMap });
    setBlockMap(blockMap);
    setPages(updated);
    setSelectedPage(created);
  };

  const clickCloseHandler = () => {
    setStaticMenuToggle(false);
    setHoveredMenuToggle(false);
  };

  return (
    <div css={wrapperCss(staticMenuToggle)}>
      {hoveredMenuToggle && (
        <div css={buttonsCss()}>
          <div css={plusCss()}>
            <HeaderButton clickHandler={CreatingPageHandler}>
              <PlusPage />
            </HeaderButton>
          </div>
          {staticMenuToggle && (
            <HeaderButton clickHandler={clickCloseHandler}>
              <DoubleChevronLeft />
            </HeaderButton>
          )}
        </div>
      )}
      <div css={workspaceCss()}>WORKSPACE</div>
      <Suspense fallback={<div>Loading...</div>}>
        {pages.map((page) => (
          <MenuItem key={page.id} page={page} />
        ))}
      </Suspense>
    </div>
  );
}

export default Menu;
