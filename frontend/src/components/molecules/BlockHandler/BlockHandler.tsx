/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React from 'react';

import { ReactComponent as DraggableIcon } from '@assets/draggable.svg';
import { ReactComponent as PlusIcon } from '@assets/plus.svg';

const buttonWrapperCss = () => css`
  display: flex;
  height: 100%;
  position: absolute;
  top: 0;
  align-items: center;
  left: -40px;
  & svg {
    margin-right: 2px;
  }
  & svg:hover {
    cursor: grab;
    background-color: rgba(55, 53, 47, 0.4);
    border-radius: 3px;
  }
`;
const buttonCss = () => css`
  display: inline-block;
  height: 16px;
`;

function BlockHandler(): JSX.Element {
  return (
    <div css={buttonWrapperCss()}>
      <PlusIcon css={buttonCss()} />
      <div css={buttonCss()}>
        <DraggableIcon css={buttonCss()} />
      </div>
    </div>
  );
}

export default BlockHandler;
