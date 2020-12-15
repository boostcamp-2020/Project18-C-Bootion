/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';
import { MouseEvent } from 'react';
import { Block } from '@/schemes';
import { useRecoilValue } from 'recoil';
import { draggingBlockState, hoverState } from '@/stores';

const leftHoverAreaCss = css`
  position: absolute;
  top: 0;
  right: 100%;
  width: calc(10% + 36px);
  height: 100%;
`;
const rightHoverAreaCss = css`
  position: absolute;
  top: 0;
  left: 100%;
  width: 10%;
  height: 100%;
`;
const commonHoverAreaCss = css`
  &:hover {
    cursor: text;
  }
`;
const draggingHoverUnderlineCss = () => css`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 15%;
  background-color: rgba(80, 188, 223, 0.7);
`;

interface Props {
  block: Block;
  clickHandler: (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
  ) => void;
}

function HoverArea({ block, clickHandler }: Props): JSX.Element {
  const draggingBlock = useRecoilValue(draggingBlockState);
  const hoverId = useRecoilValue(hoverState);

  const leftDragEndHandler = () => {
    console.log(draggingBlock?.value);
  };

  const rightDragEndHandler = () => {
    console.log(draggingBlock?.value);
  };

  return (
    <div css={commonHoverAreaCss} onClick={clickHandler} onKeyDown={() => {}}>
      <div css={leftHoverAreaCss} onMouseUp={leftDragEndHandler} />
      <div css={rightHoverAreaCss} onMouseUp={rightDragEndHandler} />
      {draggingBlock && hoverId === block.id && (
        <div css={draggingHoverUnderlineCss()} />
      )}
    </div>
  );
}

export default HoverArea;
