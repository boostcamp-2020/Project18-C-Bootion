import React from 'react';

export type MyComponentProps = {
  /** 아무 이름이나 입력해보세요. */
  name: string;
};

/** 별 의미 없는 예시 컴포넌트 */
const MyComponent = ({ name }: MyComponentProps) => {
  return (
    <div>
      Hello,
      {' '}
      {name}
    </div>
  );
};

MyComponent.defaultProps = {
  name: 'Storybook',
};
export default MyComponent;