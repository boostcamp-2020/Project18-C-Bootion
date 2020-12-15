/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';
import { MouseEvent } from 'react';
import { Block } from '@/schemes';
import { useRecoilValue } from 'recoil';
import { draggingBlockState } from '@/stores';

const leftHoverAreaCss = css`
  position: absolute;
  top: 0;
  right: 100%;
  width: calc(10% + 36px);
  height: 100%;
  // background-color: rgba(255, 0, 0, 0.3);
`;
const rightHoverAreaCss = css`
  position: absolute;
  top: 0;
  left: 100%;
  width: 10%;
  height: 100%;
  // background-color: rgba(0, 0, 255, 0.3);
`;
const commonHoverAreaCss = css`
  &:hover {
    cursor: text;
  }
`;

interface Props {
  block: Block;
  clickHandler: (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
  ) => void;
}

function HoverArea({ block, clickHandler }: Props): JSX.Element {
  const draggingBlock = useRecoilValue(draggingBlockState);

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
    </div>
  );
}

export default HoverArea;
