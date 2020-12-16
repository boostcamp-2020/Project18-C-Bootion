/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React from 'react';

import { ReactComponent as DraggableIcon } from '@assets/draggable.svg';
import { ReactComponent as PlusIcon } from '@assets/plus.svg';
import { useSetRecoilState } from 'recoil';

import { draggingBlockState } from '@/stores';
import { Block } from '@/schemes';

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

interface Props {
  blockDTO: Block;
  blockComponentRef: any;
}

function BlockHandler({ blockDTO, blockComponentRef }: Props): JSX.Element {
  const setDraggingBlock = useSetRecoilState(draggingBlockState);

  const dragStartHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.setDragImage(blockComponentRef.current, 0, 0);

    setDraggingBlock(blockDTO);
  };

  return (
    <div css={buttonWrapperCss()}>
      <PlusIcon css={buttonCss()} />
      <div
        css={buttonCss()}
        draggable="true"
        onDragStart={dragStartHandler}
        onMouseEnter={() => setDraggingBlock(blockDTO)}
        onMouseLeave={() => setDraggingBlock(null)}
      >
        <DraggableIcon css={buttonCss()} />
      </div>
    </div>
  );
}

export default BlockHandler;
