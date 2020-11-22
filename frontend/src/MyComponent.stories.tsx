import React from 'react';
import MyComponent from './MyComponent';

export default {
  component: MyComponent,
  title: 'MyComponent',
};

export const myComponent = () => <MyComponent name="Storybook" />;

myComponent.story = {
  name: 'Default',
};