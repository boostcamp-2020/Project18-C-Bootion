/** @jsx jsx */
/** @jsxRuntime classic */
import { css, jsx } from '@emotion/react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useState } from 'react';

import { Page } from '@/schemes';
import { blockMapState, pagesState, pageState } from '@/stores';
import { HeaderButton } from '@atoms/index';
import { ReactComponent as Trash } from '@assets/trash.svg';
import { deletePage, readBlockMap, refreshPages } from '@/utils';

const itemWrapperCss = (isHovered: boolean) => css`
  position: relative;
  align-items: center;
  cursor: pointer;
`;
const itemCss = (isHovered: boolean) => css`
  min-height: 27px;
  padding: 2px 14px;
  padding-right: ${isHovered ? 8 : 14}px;
  background: ${isHovered ? 'rgba(55, 53, 47, 0.08)' : 'inherit'};
`;
const selectedItemCss = (isHovered: boolean) => css`
  min-height: 27px;
  padding: 2px 14px;
  padding-right: ${isHovered ? 8 : 14}px;
  background: ${isHovered
    ? 'rgba(55, 53, 47, 0.16)'
    : 'rgba(55, 53, 47, 0.08)'};
`;
const titleCss = () => css`
  color: rgb(55, 53, 47);
  font-size: 14px;
  font-weight: 600;
  line-height: 2.1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const trashCss = () => css`
  position: absolute;
  top: 2px;
  right: 13px;
`;

interface Props {
  page: Page;
}

function MenuItem({ page }: Props): JSX.Element {
  const [selectedPage, setSelectedPage] = useRecoilState(pageState);
  const [hoverToggle, setHoverToggle] = useState(false);
  const setPages = useSetRecoilState(pagesState);
  const setBlockMap = useSetRecoilState(blockMapState);

  const selectPageHandler = async () => {
    setBlockMap((await readBlockMap(page.id)).blockMap);
    setSelectedPage(page);
  };

  const deletePageHandler = async () => {
    await deletePage(page.id);
    const pages = await refreshPages();

    if (page.id === selectedPage.id) {
      const nextSelectedPage = pages[0];
      setBlockMap((await readBlockMap(nextSelectedPage.id)).blockMap);
      setSelectedPage(nextSelectedPage);
    }
    setPages(pages);
  };

  return (
    <div
      css={itemWrapperCss()}
      onMouseEnter={() => setHoverToggle(true)}
      onMouseLeave={() => setHoverToggle(false)}
    >
      <div
        key={page.id}
        css={
          selectedPage.id === page.id
            ? selectedItemCss(hoverToggle)
            : itemCss(hoverToggle)
        }
        onClick={selectPageHandler}
        onKeyUp={selectPageHandler}
      >
        <div css={titleCss()}>{page.title || 'Untitled'}</div>
      </div>
      {hoverToggle && (
        <div css={trashCss()}>
          <HeaderButton clickHandler={deletePageHandler}>
            <Trash />
          </HeaderButton>
        </div>
      )}
    </div>
  );
}

export default MenuItem;
