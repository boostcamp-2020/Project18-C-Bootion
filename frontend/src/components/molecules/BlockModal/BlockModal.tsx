/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css, keyframes } from '@emotion/react';
import { ReactPortal, MouseEvent } from 'react';
import ReactDOM from 'react-dom';

import { useRecoilState, useRecoilValue } from 'recoil';
import { modalState, focusState } from '@/stores';
import { createBlock } from '@/utils';
import { useManager } from '@/hooks';

import TextImg from '@assets/text.png';
import H1Img from '@assets/heading1.png';
import H2Img from '@assets/heading2.png';
import H3Img from '@assets/heading3.png';
import BulletedListImg from '@assets/bulletedList.png';
import NumberedListImg from '@assets/numberedList.png';
import ToggleListImg from '@assets/toggledList.png';
import QuoteImg from '@assets/quote.png';

const fadein = keyframes`
  from {
      opacity:0;
  }
  to {
      opacity:1;
  }
`;

const modalWrapperCss = (left: number, top: number) => css`
  position: fixed;
  left: ${left}px;
  top: ${top}px;
  height: 300px;
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-left: calc(96px + env(safe-area-inset-left));
  padding-right: calc(96px + env(safe-area-inset-right));
  max-width: 100%;
  margin: auto;
  border: solid 0.5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.1);
  background-color: white;
  z-index: 2;
  overflow-y: scroll;
  animation: ${fadein} 0.3s;
  .header {
    font-size: 12px;
    font-weight: 20px;
    color: rgba(0, 0, 0, 0.5);
  }
`;

const modalComponentCss = css`
  display: flex;
  padding: 5px;
  width: inherit;
  font-size: 15px;
  div {
    margin: 4px;
  }
  img {
    width: 50px;
    height: 50px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }
  .des {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.3);
  }
  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const typeName: { [key: string]: string } = {
  text: 'Text',
  heading1: 'Heading1',
  heading2: 'Heading2',
  heading3: 'Heading3',
  bulletedlist: 'Bulleted list',
  numberedlist: 'Numbered list',
  togglelist: 'Toggle list',
  quote: 'Quote',
};

const typeObj: { [key: string]: string } = {
  text: 'Just start writing with plain text.',
  heading1: 'Big section heading.',
  heading2: 'Medium section heading.',
  heading3: 'Small section heading.',
  bulletedlist: 'Create a simple bulleted list.',
  numberedlist: 'Create a list with numbering.',
  togglelist: 'Toggles can hide and show content inside.',
  quote: 'Capture a quote.',
};

const typeImg: { [key: string]: any } = {
  text: TextImg,
  heading1: H1Img,
  heading2: H2Img,
  heading3: H3Img,
  bulletedlist: BulletedListImg,
  numberedlist: NumberedListImg,
  togglelist: ToggleListImg,
  quote: QuoteImg,
};

function ModalPortal({ children }: any): ReactPortal {
  const el = document.getElementById('modal');
  return ReactDOM.createPortal(children, el);
}

function BlockModal(): JSX.Element {
  const [modal, setModal] = useRecoilState(modalState);
  const focusId = useRecoilValue(focusState);
  const [
    { block, blockIndex },
    { startTransaction, commitTransaction, addSibling },
  ] = useManager(focusId);

  const createBlockHandler = async (type: string) => {
    const { block: updatedBlock } = await createBlock({
      parentBlockId: block.parentId,
      index: blockIndex + 1,
      block: { type },
    });
    startTransaction();
    const newBlock = addSibling(updatedBlock);
    commitTransaction();
    // setFocus(newBlock);
  };

  const onClickType = (type: string) => (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
  ) => {
    createBlockHandler(type);
    setModal({ ...modal, isOpen: false });
  };

  return (
    <ModalPortal>
      <div css={modalWrapperCss(modal.left, modal.top)}>
        {Object.keys(typeName).map((type) => (
          <div
            key={type}
            css={modalComponentCss}
            onClick={onClickType(type)}
            onKeyPress={() => {}}
          >
            <div>
              <img alt={type} src={typeImg[type]} />
            </div>
            <div>
              <div>{typeName[type]}</div>
              <div className="des">{typeObj[type]}</div>
            </div>
          </div>
        ))}
      </div>
    </ModalPortal>
  );
}

export default BlockModal;
