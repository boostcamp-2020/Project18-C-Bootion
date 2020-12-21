/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';

import { Block, BlockType } from '@/schemes';

export const regexType: { [key: string]: RegExp } = {
  heading3: /^###/gm,
  heading2: /^##/gm,
  heading1: /^#/gm,
  bulletedlist: /^[-,+]/gm,
  numberedlist: /^\d+\./gm,
  quote: /^\|/gm,
};

export const validateType = (content: string): BlockType => {
  if (content === '#') return BlockType.HEADING1;
  if (content === '##') return BlockType.HEADING2;
  if (content === '###') return BlockType.HEADING3;
  if (content === '-' || content === '+') return BlockType.BULLETED_LIST;
  if (/^\d+\./gm.test(content)) return BlockType.NUMBERED_LIST;
  if (content === '|') return BlockType.QUOTE;
  return null;
};

const divCSS = css`
  margin: 0px 4px;
  font-size: 18px;
  color: inherit;
  height: 100%;
`;

export const listBlockType = (block: Block, idx: number) => {
  if (block.type === BlockType.NUMBERED_LIST) {
    return <span css={divCSS}>{`${idx}. `}</span>;
  }
  return listComponent[block.type];
};

export const listComponent: { [key: string]: any } = {
  bulletedlist: <div css={divCSS}>•</div>,
  quote: <div css={divCSS}>▕</div>,
};

export const fontSize: { [key: string]: string } = {
  heading1: 'xx-large',
  heading2: 'x-large',
  heading3: 'large',
};

export const placeHolder: { [key: string]: string } = {
  text: "Type '/' for commands",
  heading1: 'Heading 1',
  heading2: 'Heading 2',
  heading3: 'Heading 3',
  quote: 'Empty quote',
};
