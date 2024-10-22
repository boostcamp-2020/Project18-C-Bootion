/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from '@emotion/react';

const h1 = { margin: 5, fontSize: 'xx-large' };
const h2 = { margin: 5, fontSize: 'x-large' };
const h3 = { margin: 5, fontSize: 'large' };

interface HeadingProps {
  handleValue: any;
  content: any;
}

function Heading1(compoProps: HeadingProps): JSX.Element {
  return (
    <div
      css={h1}
      contentEditable
      suppressContentEditableWarning
      onInput={compoProps.handleValue}
    >
      {compoProps.content.current}
    </div>
  );
}

function Heading2(compoProps: HeadingProps): JSX.Element {
  return (
    <div
      css={h2}
      contentEditable
      suppressContentEditableWarning
      onInput={compoProps.handleValue}
    >
      {compoProps.content.current}
    </div>
  );
}

function Heading3(compoProps: HeadingProps): JSX.Element {
  return (
    <div
      css={h3}
      contentEditable
      suppressContentEditableWarning
      onInput={compoProps.handleValue}
    >
      {compoProps.content.current}
    </div>
  );
}

export default { Heading1, Heading2, Heading3 };
