/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';

import { useRecoilState, useSetRecoilState } from 'recoil';
import { pagesState, selectedPageState } from '@/stores';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { debounce, readPages, updatePage } from '@/utils';
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

  &::placeholder {
    color: rgba(55, 53, 47, 0.15);
  }
`;

interface Props {}

function Title({}: Props): JSX.Element {
  const [selectedPage, setSelectedPage] = useRecoilState(selectedPageState);
  const setPages = useSetRecoilState(pagesState);
  const [title, setTitle] = useState(selectedPage.title);
  const updateSelectedPage = useRef(
    debounce(async (updatedPage: Page) => {
      setSelectedPage(await updatePage(updatedPage));
      setPages(await readPages());
    }, 300),
  ).current;

  useEffect(() => {
    setTitle(selectedPage.title);
  }, [selectedPage]);

  const handleChange = async (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setTitle(value);
    updateSelectedPage({ ...selectedPage, title: value });
  };

  return (
    <div css={wrapperCss()}>
      <div css={titlePaddingTopCss()} />
      <textarea
        placeholder="Untitled"
        css={titleCss()}
        onChange={handleChange}
        value={title}
      />
    </div>
  );
}

export default Title;
