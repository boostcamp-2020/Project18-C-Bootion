/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import { ReactComponent as DraggableIcon } from '../../../assets/draggable.svg';
import { ReactComponent as PlusIcon } from '../../../assets/plus.svg';

const ButtonWrapper = styled.div`
  display: block;
  position: absolute;
  top: ${(props: ComponentInfo) => props.location.y + 6}px;
  left: ${(props: ComponentInfo) => props.location.x - 40}px;
  z-index: 10;
  & svg {
    margin-right: 2px;
  }
  & svg:hover {
    cursor: grab;
    background-color: rgba(55, 53, 47, 0.4);
    border-radius: 3px;
  }
`;

interface ComponentInfo {
  location: { x: number; y: number };
}

function BlockHandler({ location }: ComponentInfo): React.ReactElement {
  return (
    <ButtonWrapper className="block-handler" location={location}>
      <PlusIcon css={{ height: '16px' }} />
      <DraggableIcon css={{ height: '16px' }} />
    </ButtonWrapper>
  );
}

export default BlockHandler;
