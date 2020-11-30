/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css, SerializedStyles } from '@emotion/react';
import { useRef, useState, useEffect, useCallback, FormEvent } from 'react';
import { Heading } from '@components/atoms';
import { Block, BlockType } from '@/schemes';

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

const regex = {
  h1: /^#\s[^\s.]*/gm,
  h2: /^##\s[^\s.]*/gm,
  h3: /^###\s[^\s.]*/gm,
};

interface Props {
  block: Block;
}

const ConvertBlock = (
  type: string,
  handleValue: any,
  content: any,
  block: Block,
): JSX.Element => {
  const compoProps = {
    handleValue,
    content,
  };
  if (type === 'Heading1') return <Heading.Heading1 {...compoProps} />;
  if (type === 'Heading2') return <Heading.Heading2 {...compoProps} />;
  if (type === 'Heading3') return <Heading.Heading3 {...compoProps} />;
  return (
    <div
      css={contentsCss(block)}
      contentEditable
      suppressContentEditableWarning
      placeholder="Type '/' for commands"
      onInput={handleValue}
    >
      {content.current}
    </div>
  );
};

interface HoverInfo {
  size: { width: number; height: number };
}

function HoverArea({ size }: HoverInfo): React.ReactElement {
  return (
    <div className="hover-area">
      <div
        className="leftHoverArea"
        css={css`
          position: absolute;
          top: 0;
          right: ${size.width}px;
          width: calc(10% + 36px);
          height: ${size.height}px;
        `}
      />
      <div
        className="centerHoverArea"
        css={css`
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: ${size.height}px;
          z-index: -1;
        `}
      />
      <div
        className="rightHoverArea"
        css={css`
          position: absolute;
          top: 0;
          left: ${size.width}px;
          width: 10%;
          height: ${size.height}px;
        `}
      />
    </div>
  );
}

function BlockComponent({ block }: Props): JSX.Element {
  const content = useRef(block.value);
  const [hoveredBlock, setHoveredBlock] = useRecoilState(
    pageState.hoveredBlockState,
  );
  const [type, setType] = useState('');
  const [componentSize, setComponentSize] = useState({ width: 0, height: 0 });
  const handleMouseOver = (
    ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    setHoveredBlock({
      id: block.id,
      position: {
        x: blockRef.current.offsetLeft,
        y: blockRef.current.offsetTop,
      },
    });
  };
  const handleMouseLeave = (ev: any) => {
    const { relatedTarget } = ev;
    const blockComponent = relatedTarget.closest
      ? relatedTarget.closest('.block')
      : null;
    const classLists = relatedTarget.closest
      ? relatedTarget.closest('.block-handler')?.classList
      : null;

    if (
      !(classLists
        ? Object.values(classLists).includes('block-handler')
        : null) ||
      blockComponent?.dataset.componentId === hoveredBlock.id
    ) {
      setHoveredBlock({
        id: null,
        position: { x: 0, y: 0 },
      });
    }
  };
  const blockRef = useRef<HTMLDivElement>();
  const handleValue = (event: FormEvent<HTMLDivElement>) => {
    content.current = event.currentTarget.textContent || '';
    if (regex.h1.test(content.current)) setType('Heading1');
    if (regex.h2.test(content.current)) setType('Heading2');
    if (regex.h3.test(content.current)) setType('Heading3');
  };

  useEffect(() => {
    setComponentSize({
      width: blockRef.current.clientWidth,
      height: blockRef.current.clientHeight,
    });
  }, [blockRef.current?.clientWidth, blockRef.current?.clientHeight]);
  return (
    <div
      key={block.id}
      css={blockCss()}
      data-block-id={block.id}
      className="block"
    >
      <div
        css={{ position: 'relative' }}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        onFocus={() => {}}
        ref={blockRef}
      >
        {ConvertBlock(type, handleValue, content, block)}
        <HoverArea size={componentSize} />
      </div>

      {block?.children?.length && (
        <div css={descendantsCss(block)}>
          {block.children.map((_block: Block) => (
            <BlockComponent block={_block} />
          ))}
        </div>
      )}
    </div>
  );
}

export default BlockComponent;
