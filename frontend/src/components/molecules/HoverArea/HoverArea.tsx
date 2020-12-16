/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';
import { MouseEvent } from 'react';
import { useRecoilValue } from 'recoil';
import { draggingBlockState } from '@/stores';

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

interface Props {
  clickHandler: (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
  ) => void;
}

function HoverArea({ clickHandler }: Props): JSX.Element {
  const draggingBlock = useRecoilValue(draggingBlockState);

  return (
    <div css={commonHoverAreaCss} onClick={clickHandler} onKeyDown={() => {}}>
      {!draggingBlock && <div css={leftHoverAreaCss} />}
      <div css={rightHoverAreaCss} />
    </div>
  );
}

export default HoverArea;
