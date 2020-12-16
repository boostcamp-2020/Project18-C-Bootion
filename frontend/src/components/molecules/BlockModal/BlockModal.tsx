/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';
import { ReactPortal } from 'react';
import ReactDOM from 'react-dom';

import TextImg from '@assets/text.png';
import H1Img from '@assets/heading1.png';
import H2Img from '@assets/heading2.png';
import H3Img from '@assets/heading3.png';
import BulletedListImg from '@assets/bulletedList.png';
import NumberedListImg from '@assets/numberedList.png';
import ToggleListImg from '@assets/toggledList.png';
import QuoteImg from '@assets/quote.png';

const modalWrapperCss = css`
  position: fixed;
  left: 0;
  top: 0;
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

const typeObj: { [key: string]: string } = {
  Text: 'Just start writing with plain text.',
  Heading1: 'Big section heading.',
  Heading2: 'Medium section heading.',
  Heading3: 'Small section heading.',
  'Bulleted list': 'Create a simple bulleted list.',
  'Numbered list': 'Create a list with numbering.',
  'Toggle list': 'Toggles can hide and show content inside.',
  Quote: 'Capture a quote.',
};

const typeImg: { [key: string]: any } = {
  Text: TextImg,
  Heading1: H1Img,
  Heading2: H2Img,
  Heading3: H3Img,
  'Bulleted list': BulletedListImg,
  'Numbered list': NumberedListImg,
  'Toggle list': ToggleListImg,
  Quote: QuoteImg,
};

function ModalPortal({ children }: any): ReactPortal {
  const el = document.getElementById('modal');
  return ReactDOM.createPortal(children, el);
}

function BlockModal(): JSX.Element {
  return (
    <ModalPortal>
      <div css={modalWrapperCss}>
        <div className="header">BASIC BLOCKS</div>
        {Object.keys(typeObj).map((type) => (
          <div css={modalComponentCss}>
            <div>
              <img alt={type} src={typeImg[type]} />
            </div>
            <div>
              <div>{type}</div>
              <div className="des">{typeObj[type]}</div>
            </div>
          </div>
        ))}
      </div>
    </ModalPortal>
  );
}

export default BlockModal;
