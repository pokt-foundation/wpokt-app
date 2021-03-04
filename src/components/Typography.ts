import styled, { css } from 'styled-components';
import { media } from 'components/breakpoints';

interface ITypograhpy {
  color?: string;
}

export const H1 = styled.h1<ITypograhpy>`
  font-family: PixelSplitter;
  font-size: 1.4rem;
  letter-spacing: 1px;

  ${media.sm`
        font-size: 1.8rem;
    `}

  ${media.md`
        font-size: 2.4rem;
        letter-spacing: 3px;
    `}

    ${(props) =>
    props.color &&
    css`
      color: ${props.color};
    `}
`;

export const H2 = styled.h2<ITypograhpy>`
  font-family: PixelSplitter;
  font-size: 1rem;
  letter-spacing: 1px;
  line-height: 1.4rem;

  ${media.sm`
        font-size: 1.2rem;
    `}

  ${media.md`
        font-size: 1.6rem;
        letter-spacing: 3px;
    `}

    ${(props) =>
    props.color &&
    css`
      color: ${props.color};
    `}
`;

export const P1 = styled.p<ITypograhpy>`
  font-family: PixelSplitter;
  font-size: 1.6rem;
  letter-spacing: 1px;

  ${(props) =>
    props.color &&
    css`
      color: ${props.color};
    `}
`;

export const P2 = styled.p<ITypograhpy>`
  font-family: PixelSplitter;
  font-size: 0.8rem;
  line-height: 1.2rem;

  ${media.xs`
        font-size: 1rem;
    `}

  ${media.md`
        font-size: 1.4rem;
    `}

    ${(props) =>
    props.color &&
    css`
      color: ${props.color};
    `}
`;
