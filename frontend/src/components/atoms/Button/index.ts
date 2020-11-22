/** @jsx jsx */
import { jsx } from '@emotion/react';
import styled from '@emotion/styled';

const Button  = styled.button<{
  color: string;
  backgroundColor: string;
}>`
  width: 100%;
  height: 33px;
  font-weight: bold;
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
  border-radius: 3px;
  border: none;
  outline: none;
  cursor: pointer;
`;

export default Button;
