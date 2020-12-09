/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';
import { Suspense } from 'react';
import { useRecoilState } from 'recoil';

import { pagesState, selectedPageState, staticMenuToggleState } from '@/stores';
import { createPage } from '@/utils';

const wrapperCss = (staticToggle: boolean) => css`
  width: 240px;
  height: 80vh;
  border-radius: 3px;
  background: rgb(247, 246, 243);
  ${!staticToggle ? 'box-shadow: 0 0 10px 1px #aaaaaa' : ''};
`;

const itemCss = (isSelected: boolean) => css`
  color: ${isSelected ? 'red' : 'black'};
`;

interface Props {}

function Menu({}: Props): JSX.Element {
  const [pages, setPages] = useRecoilState(pagesState);
  const [staticToggle, setStaticToggle] = useRecoilState(staticMenuToggleState);
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
    <div css={wrapperCss(staticToggle)}>
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
