import styled, { css } from 'styled-components';
import { media } from 'components/breakpoints';
import { GU } from 'components/theme';

interface IFlex {
  align?: 'flex-start' | 'center' | 'flex-end';
  direction?: string;
  full?: boolean;
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between';
}

export const Container = styled.div`
  margin: 0 auto;
  width: ${80 * GU}px;

  ${media.xs`
    width: ${120 * GU}px;
  `}

  ${media.sm`
    width: ${190 * GU}px;
  `}

  ${media.md`
    width: ${247 * GU}px;
  `}

  ${media.lg`
    width: ${300 * GU}px;
  `}

  ${media.xl`
    width: ${450 * GU}px;
  `}
`;

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
