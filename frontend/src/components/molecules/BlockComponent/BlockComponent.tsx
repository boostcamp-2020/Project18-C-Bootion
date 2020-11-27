/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css, SerializedStyles } from '@emotion/react';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Block, BlockType } from '../../../schemes';

const isGridOrColumn = (block: Block): boolean =>
  block.type === BlockType.GRID || block.type === BlockType.COLUMN;
const blockCss = (): SerializedStyles => css`
  width: 100%;
  max-width: 1000px;
  margin-top: 3px;
  margin-bottom: 3px;
  font-size: 16px;
  line-height: 1.5;
  color: inherit;
  fill: inherit;
`;
const contentsCss = (block: Block): SerializedStyles => css`
  display: ${!isGridOrColumn(block) ? 'flex' : 'none'};
  align-items: flex-start;
  max-width: 100%;
  width: 100%;
  min-height: 30px;
  white-space: pre-wrap;
  word-break: break-word;
  caret-color: rgb(55, 53, 47);
  padding: 3px 2px;
  min-height: 1em;
  z-index: 10;
  color: rgb(55, 53, 47);
  fill: inherit;
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
const descendantsCss = (block: Block): SerializedStyles => css`
  display: flex;
  padding-left: ${!isGridOrColumn(block) ? '1.5rem' : 0};
  flex-direction: ${block.type !== BlockType.GRID ? 'column' : 'row'};
  color: inherit;
  fill: inherit;
`;

interface Props {
  block: Block;
  notifyHover: Function;
}

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
          height: ${componentInfo.height}px;
        `}
      />
      <div
        className="centerHoverArea"
        css={css`
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: ${componentInfo.height}px;
          z-index: -1;
        `}
      />
      <div
        className="rightHoverArea"
        css={css`
          position: absolute;
          top: 0;
          left: ${componentInfo.width}px;
          width: 10%;
          height: ${componentInfo.height}px;
        `}
      />
    </div>
  );
}

function BlockComponent({ block, notifyHover }: Props): JSX.Element {
  const blockRef = useRef<HTMLDivElement>();
  const [componentSize, setComponentSize] = useState({ width: 0, height: 0 });
  const onMouseEnter = useCallback(
    (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      notifyHover({
        id: block.id,
        componentInfo: {
          x: blockRef.current.offsetLeft,
          y: blockRef.current.offsetTop,
        },
      });
    },
    [],
  );
  useEffect(() => {
    setComponentSize({
      width: blockRef.current.clientWidth,
      height: blockRef.current.clientHeight,
    });
  }, [blockRef.current?.clientWidth, blockRef.current?.clientHeight]);
  return (
    <div css={blockCss()} data-block-id={block.id} className="block">
      <div
        css={{ position: 'relative' }}
        onMouseOver={onMouseEnter}
        onFocus={() => {}}
        ref={blockRef}
      >
        <div
          css={contentsCss(block)}
          contentEditable="true"
          suppressContentEditableWarning
          placeholder="Type '/' for commands"
        >
          {block.value}
        </div>
        <HoverArea componentInfo={componentSize} />
      </div>

      {block?.children?.length && (
        <div css={descendantsCss(block)}>
          {block.children.map((_block: Block) => (
            <BlockComponent
              key={_block.id}
              block={_block}
              notifyHover={notifyHover}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default BlockComponent;
