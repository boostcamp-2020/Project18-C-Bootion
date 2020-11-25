/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from '@emotion/react';

// import { Record, BlockType } from '@schemes/index';
import Record from '@schemes/Record';
import BlockType from '@schemes/BlockType';

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
  return (
    <div css={{ ...block }}>
      {!isGridOrColumn(record) ? (
        <div css={contents} contentEditable>
          {record.value}
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
