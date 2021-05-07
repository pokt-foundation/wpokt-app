import styled, { css } from 'styled-components';
import { media } from 'components/breakpoints';

interface ITypograhpy {
  center?: boolean;
  color?: string;
  paragraphFont?: boolean;
  weight?: number;
}

export const H1 = styled.h1<ITypograhpy>`
  font-family: PixelSplitter;
  font-size: 1.4rem;
  letter-spacing: 1px;
  line-height: 20px;

  ${media.sm`
    font-size: 1.8rem;
  `}

  ${media.md`
    font-size: 2.4rem;
    letter-spacing: 3px;
    line-height: 30px;
  `}

  ${(props) =>
    props.center &&
    css`
      text-align: center;
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
    line-height: 2rem;
  `}

  ${(props) =>
    props.center &&
    css`
      text-align: center;
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
    props.center &&
    css`
      text-align: center;
    `}

  ${(props) =>
    props.color &&
    css`
      color: ${props.color};
    `}

  ${(props) =>
    props.paragraphFont &&
    css`
      font-family: 'Quantico', sans-serif;
    `}

  ${(props) =>
    props.weight &&
    css`
      font-weight: ${props.weight};
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
    line-height: 1.8rem;
  `}
  
  ${(props) =>
    props.center &&
    css`
      text-align: center;
    `}
    
  ${(props) =>
    props.color &&
    css`
      color: ${props.color};
    `}

  ${(props) =>
    props.paragraphFont &&
    css`
      font-family: 'Quantico', sans-serif;
    `}

  ${(props) =>
    props.weight &&
    css`
      font-weight: ${props.weight};
    `}
`;

export const P3 = styled.p<ITypograhpy>`
  font-family: PixelSplitter;
  font-size: 0.8rem;
  line-height: 1.2rem;

  ${(props) =>
    props.center &&
    css`
      text-align: center;
    `}

  ${(props) =>
    props.color &&
    css`
      color: ${props.color};
    `}

  ${(props) =>
    props.paragraphFont &&
    css`
      font-family: 'Quantico', sans-serif;
    `}

  ${(props) =>
    props.weight &&
    css`
      font-weight: ${props.weight};
    `}
`;
