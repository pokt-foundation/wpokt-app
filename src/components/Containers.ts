import styled, { css } from 'styled-components';

interface IFlex {
  align?: 'flex-start' | 'center' | 'flex-end';
  direction?: string;
  full?: boolean;
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between';
}

export const Flex = styled.div<IFlex>`
  display: flex;

  ${(props) =>
    props.align &&
    css`
      align-items: ${props.align};
    `}

  ${(props) =>
    props.direction &&
    css`
      flex-direction: ${props.direction};
    `}

  ${(props) =>
    props.full === true &&
    css`
      height: 100%;
      width: 100%;
    `}

  ${(props) =>
    props.justify &&
    css`
      justify-content: ${props.justify};
    `}
`;
