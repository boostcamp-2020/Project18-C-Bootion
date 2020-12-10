/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';
import { Suspense } from 'react';
import { useRecoilState } from 'recoil';

import { pagesState, selectedPageState, staticMenuToggleState } from '@/stores';
import { createPage } from '@/utils';

const wrapperCss = (staticMenuToggle: boolean) => css`
  width: 240px;
  height: ${staticMenuToggle ? 100 : 80}vh;
  border-radius: ${staticMenuToggle ? 0 : '3px'};
  background: ${staticMenuToggle ? 'rgb(247, 246, 243)' : '#ffffff'};
  ${staticMenuToggle ? '' : 'box-shadow: 0 0 10px 1px #aaaaaa'};
`;

const itemCss = (isSelected: boolean) => css`
  display: inline-block;
  width: 100%;
  color: ${isSelected ? 'red' : 'black'};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

interface Props {}

function Menu({}: Props): JSX.Element {
  const [pages, setPages] = useRecoilState(pagesState);
  const [staticMenuToggle, setStaticMenuToggle] = useRecoilState(
    staticMenuToggleState,
  );
  const [selectedPage, setSelectedPage] = useRecoilState(selectedPageState);

  const handleCreatingPage = () => {
    const doFetch = async () => {
      const { pages: updated, page: created } = await createPage();
      setPages(updated);
      setSelectedPage(created);
    };
    doFetch();
  };

  return (
    <div css={wrapperCss(staticMenuToggle)}>
      <div>WORKSPACE</div>
      <button type="button" onClick={handleCreatingPage}>
        +
      </button>
      <Suspense fallback={<div>Loading...</div>}>
        {pages.map((page) => {
          const isSelected = page.id === selectedPage.id;

          const handleSelectingPage = () => setSelectedPage(page);

          return (
            <div
              key={page.id}
              css={itemCss(isSelected)}
              onClick={handleSelectingPage}
              onKeyUp={handleSelectingPage}
            >
              {`${page.title || 'Untitled'} - ${page.id}`}
            </div>
          );
        })}
      </Suspense>
    </div>
  );
}

export default Menu;
