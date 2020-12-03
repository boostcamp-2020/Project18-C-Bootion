/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css, SerializedStyles } from '@emotion/react';
import { useEffect } from 'react';

import { useBlockConversion, useCommand } from '@/hooks';
import { BlockHandler, HoverArea } from '@components/molecules';
import { Block, BlockType } from '@/schemes';
import { hoverState, focusState, blockState } from '@stores/page';
import { useRecoilState } from 'recoil';

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
const descendantsCss = (block: Block): SerializedStyles => css`
  display: flex;
  padding-left: ${!isGridOrColumn(block) ? '1.5rem' : 0};
  flex-direction: ${block.type !== BlockType.GRID ? 'column' : 'row'};
  color: inherit;
  fill: inherit;
`;

function BlockComponent({ blockDTO }: { blockDTO: Block }): JSX.Element {
  const [focusId, setFocusId] = useRecoilState<string>(focusState);
  const [Dispatcher] = useCommand();
  const [block, setBlock] = useRecoilState(blockState(blockDTO.id));
  const [hoverId, setHoverId] = useRecoilState(hoverState);
  const renderBlock = block ?? blockDTO;
  const handleKeyPress = (ev: any) => {
    const { focusNode, focusOffset } = window.getSelection();
    if (
      ev.key === 'ArrowUp' ||
      ev.key === 'ArrowDown' ||
      (ev.key === 'ArrowLeft' && focusOffset === 0) ||
      (ev.key === 'ArrowRight' &&
        focusOffset ===
          ((focusNode as any).length ?? (focusNode as any).innerText.length))
    ) {
      ev.preventDefault();
      Dispatcher(ev.key);
    }
  };
  const contentComponent = useBlockConversion(renderBlock, handleKeyPress);

  useEffect(() => {
    setBlock(blockDTO);
    return () => {
      setBlock(null);
    };
  }, []);

  return (
    <div css={blockCss()}>
      <div
        css={{ position: 'relative' }}
        onMouseEnter={() => setHoverId(renderBlock.id)}
        onMouseLeave={() => setHoverId(null)}
        role="input"
        onKeyDown={handleKeyPress}
        tabIndex={-1}
        onFocus={() => {
          if (focusId !== renderBlock.id) {
            console.log(`${renderBlock.id} 가 focus`);
            setFocusId(renderBlock.id);
          }
        }}
      >
        {contentComponent}
        <HoverArea />
        {hoverId === renderBlock.id && <BlockHandler />}
      </div>

      {renderBlock.children.length ? (
        <div css={descendantsCss(renderBlock)}>
          {renderBlock.children.map((_block: Block) => (
            <BlockComponent key={_block.id} blockDTO={_block} />
          ))}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default BlockComponent;
