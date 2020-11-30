/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';

interface ComponentSize {
  size: { width: number; height: number };
}
const LeftHoverAreaCss = ({ size }: ComponentSize) => css`
  position: absolute;
  top: 0;
  right: ${size.width}px;
  width: calc(10% + 36px);
  height: ${size.height}px;
`;
const RightHoverAreaCss = ({ size }: ComponentSize) => css`
  position: absolute;
  top: 0;
  left: ${size.width}px;
  width: 10%;
  height: ${size.height}px;
`;
function HoverArea(sizeInfo: ComponentSize): React.ReactElement {
  return (
    <div>
      <div css={LeftHoverAreaCss(sizeInfo)} />
      <div css={RightHoverAreaCss(sizeInfo)} />
    </div>
  );
}

export default HoverArea;
