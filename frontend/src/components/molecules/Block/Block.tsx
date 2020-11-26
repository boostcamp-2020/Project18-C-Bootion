/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useState, useCallback, useRef, useEffect } from 'react';

enum BlockType {
  Text,
  Heading1,
  Heading2,
  Heading3,
  BulletedList,
  NumberedList,
  ToggleList,
  Quote,
  Page,
  Grid,
}
interface BlockProps {
  id: string;
  type: BlockType;
  value: string;
  notifyHover: Function;
}

const BlockWrapper = styled.div`
  display: flex;
  max-width: 100%;
  min-height: 30px;
  white-space: pre-wrap;
  word-break: break-word;
  caret-color: rgb(55, 53, 47);
  padding: 3px 2px;
  min-height: 1em;
  z-index: 10;
  color: rgb(55, 53, 47);
  &:focus {
    outline: 1px solid transparent;
  }
  &:focus:empty:before {
    color: rgba(55, 53, 47, 0.4);
    content: attr(placeholder);
    display: block;
  }
  &:hover {
    cursor: text;
  }
`;

interface HoverInfo {
  componentInfo: { width: number; height: number };
}
function HoverArea({ componentInfo }: HoverInfo): React.ReactElement {
  return (
    <div className="hover-area">
      <div
        className="leftHoverArea"
        css={css`
          position: absolute;
          top: 0;
          right: ${componentInfo.width}px;
          width: calc(10% + 36px);
          height: 100%;
        `}
      />
      <div
        css={css`
        className="centerHoverArea"
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index:-1;
        `}
      />
      <div
        className="rightHoverArea"
        css={css`
          position: absolute;
          top: 0;
          left: ${componentInfo.width}px;
          width: 10%;
          height: 100%;
        `}
      />
    </div>
  );
}

function Block({
  id,
  type,
  value,
  notifyHover,
}: BlockProps): React.ReactElement {
  const blockRef = useRef<HTMLDivElement>();
  const [componentSize, setComponentSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    setComponentSize({
      width: blockRef.current.clientWidth,
      height: blockRef.current.clientHeight,
    });
  }, [blockRef.current?.clientWidth, blockRef.current?.clientHeight]);
  const onMouseEnter = useCallback(
    (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      notifyHover({
        id,
        componentInfo: {
          x: blockRef.current.offsetLeft,
          y: blockRef.current.offsetTop,
        },
      });
    },
    [],
  );
  return (
    <div
      data-component-id={id}
      ref={blockRef}
      className="block"
      onMouseOver={onMouseEnter}
      onFocus={() => {}}
      css={{ position: 'relative', margin: '2px 0' }}
    >
      <BlockWrapper
        suppressContentEditableWarning
        contentEditable="true"
        data-block-id={id}
        placeholder="Type '/' for commands"
      >
        {value}
      </BlockWrapper>
      <HoverArea componentInfo={componentSize} />
    </div>
  );
}

export default Block;
