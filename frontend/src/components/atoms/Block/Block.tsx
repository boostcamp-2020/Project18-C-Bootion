/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from '@emotion/react';
import { useState, useEffect, useRef, FormEvent } from 'react';

import { Record, BlockType } from '../../../schemes';

const block = { border: '1px solid #000000', margin: 5, width: '100%' };
const descendants = { border: '1px solid red', margin: 5 };

// const block = { margin: 5, marginRight: 0, width: '100%' };
// const descendants = { margin: 5, marginRight: 0};

const contents = { border: '1px solid blue', margin: 5 };

const isGridOrColumn = (record: Record): boolean =>
  record.type === BlockType.GRID || record.type === BlockType.COLUMN;

interface BlockProps {
  record: Record;
}

function Block({ record }: BlockProps): JSX.Element {
  const text = useRef(record.value);

  const handleValue = (event: FormEvent<HTMLDivElement>) => {
    text.current = event.currentTarget.textContent || '';
    console.log(text.current[0]);
  };

  return (
    <div css={{ ...block }}>
      {!isGridOrColumn(record) ? (
        <div css={contents} contentEditable suppressContentEditableWarning onInput={handleValue}>
          {text.current}
        </div>
      ) : (
        ''
      )}
      {record?.children?.length && (
        <div
          css={{
            ...descendants,
            paddingLeft: isGridOrColumn(record) ? 0 : 20,
            display: record.type === BlockType.GRID ? 'flex' : 'block',
          }}
        >
          {record.children.map((_record: Record) => (
            <Block key={_record.id} record={_record} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Block;
