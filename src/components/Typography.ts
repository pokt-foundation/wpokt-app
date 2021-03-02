import styled, { css } from 'styled-components';
import { media } from 'components/breakpoints';

interface ITypograhpy {
    color?: string;
}

export const H1 = styled.h1<ITypograhpy>`
    font-family: PixelSplitter;

    ${props => props.color && css`
        color: ${props.color};
    `}
`;

export const H2 = styled.h2<ITypograhpy>`
    font-family: PixelSplitter;
    font-size: 14px;

    ${props => props.color && css`
        color: ${props.color};
    `}

    ${media.md`
        font-size: 16px;
    `}
`;

export const P1 = styled.p<ITypograhpy>`
    font-family: PixelSplitter;
    font-size: 16px;

    ${props => props.color && css`
        color: ${props.color};
    `}
`;

export const P2 = styled.p<ITypograhpy>`
    font-family: PixelSplitter;
    font-size: 8px;
    line-height: 12px;

    ${props => props.color && css`
        color: ${props.color};
    `}

    ${media.xs`
        font-size: 10px;
    `}

    ${media.md`
        font-size: 14px;
    `}
`;