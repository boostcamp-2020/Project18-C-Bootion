/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';

import { Block, BlockType } from '@/schemes';

export const regexType: { [key: string]: RegExp } = {
  heading1: /^#/gm,
  heading2: /^##/gm,
  heading3: /^###/gm,
  bulletedlist: /^[-,+]/gm,
  numberedlist: /^\d+\./gm,
  quote: /^\|/gm,
};

const validator = (regex: RegExp, content: string) => regex.test(content);

export const validateType = (content: string): BlockType => {
  for (const [key, reg] of Object.entries(regexType)) {
    if (validator(reg, content)) return key as BlockType;
  }
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
