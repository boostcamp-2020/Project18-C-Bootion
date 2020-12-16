/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';

import { useRecoilState, useSetRecoilState } from 'recoil';
import { pagesState, pageState } from '@/stores';
import { ChangeEvent, useEffect, useRef } from 'react';
import { debounce, refreshPages, updatePage } from '@/utils';
import { Page } from '@/schemes';

const wrapperCss = () => css`
  padding-left: calc(96px + env(safe-area-inset-left));
  padding-right: calc(96px + env(safe-area-inset-right));
  padding-bottom: 30px;
  max-width: 100%;
  width: 900px;
  margin: auto;
`;
const titlePaddingTopCss = () => css`
  height: 100px;
`;
const titleCss = () => css`
  display: inline-block;
  min-width: 100%;
  min-height: fit-content;
  padding: 3px 2px;
  border: none;
  outline: none;
  color: rgb(55, 53, 47);
  font-weight: 700;
  font-size: 40px;
  line-height: 1.2;
  white-space: pre-wrap;
  word-break: break-word;
  caret-color: rgb(55, 53, 47);
  cursor: text;
  overflow-y: hidden;
  resize: none;

  font-family: inter, Helvetica, 'Apple Color Emoji', Arial, sans-serif,
    'Segoe UI Emoji', 'Segoe UI Symbol';

  &:empty:before {
    content: 'Untitled';
    color: rgba(55, 53, 47, 0.15);
  }
`;

function Title(): JSX.Element {
  const [selectedPage, setSelectedPage] = useRecoilState(pageState);
  const setPages = useSetRecoilState(pagesState);
  const caretRef = useRef(0);
  const updateSelectedPage = useRef(
    debounce(async (page: Page) => {
      caretRef.current = window.getSelection().focusOffset;

      const { page: updatedPage } = await updatePage(page);
      const updatedPages = await refreshPages();

      setSelectedPage(updatedPage);
      setPages(updatedPages);
    }, 300),
  ).current;

  useEffect(() => {
    const selection = window.getSelection();
    const nodeLength = selection.focusNode?.nodeValue?.length ?? 0;
    if (caretRef.current > nodeLength) {
      caretRef.current = nodeLength;
    }
    selection.collapse(selection.focusNode, caretRef.current);
  }, [selectedPage]);

  const handleChange = async (event: ChangeEvent<HTMLDivElement>) =>
    updateSelectedPage({
      ...selectedPage,
      title: event.currentTarget.textContent,
    });

  return (
    <div css={wrapperCss()}>
      <div css={titlePaddingTopCss()} />
      <div
        contentEditable
        suppressContentEditableWarning
        css={titleCss()}
        onInput={handleChange}
      >
        {selectedPage.title}
      </div>
    </div>
  );
}

export default Title;
