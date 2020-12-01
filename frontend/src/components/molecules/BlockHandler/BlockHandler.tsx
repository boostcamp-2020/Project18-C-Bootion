/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { ReactComponent as DraggableIcon } from '@assets/draggable.svg';
import { ReactComponent as PlusIcon } from '@assets/plus.svg';

const ButtonWrapper = styled.div`
  display: flex;
  height: 100%;
  position: absolute;
  top: 0;
  align-items: center;
  left: -40px;
  & svg {
    margin-right: 2px;
  }
  & svg:hover {
    cursor: grab;
    background-color: rgba(55, 53, 47, 0.4);
    border-radius: 3px;
  }
`;

function BlockHandler(): React.ReactElement {
  return (
    <ButtonWrapper>
      <PlusIcon css={{ height: '16px' }} />
      <DraggableIcon css={{ height: '16px' }} />
    </ButtonWrapper>
  );
}

export default BlockHandler;
