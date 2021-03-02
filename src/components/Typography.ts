import styled, { css } from 'styled-components';
import { media } from 'components/breakpoints';

interface ITypograhpy {
    color?: string;
}

export const H1 = styled.h1<ITypograhpy>`
    font-family: PixelSplitter;
    font-size: 14px;
    letter-spacing: 1px;

    ${media.sm`
        font-size: 18px;
    `}

    ${media.md`
        font-size: 24px;
        letter-spacing: 3px;
    `}

    ${props => props.color && css`
        color: ${props.color};
    `}
`;

export const H2 = styled.h2<ITypograhpy>`
    font-family: PixelSplitter;
    font-size: 10px;
    letter-spacing: 1px;
    line-height: 14px;

    ${media.sm`
        font-size: 12px;
    `}

    ${media.md`
        font-size: 16px;
        letter-spacing: 3px;
    `}

    ${props => props.color && css`
        color: ${props.color};
    `}
`;

export const P1 = styled.p<ITypograhpy>`
    font-family: PixelSplitter;
    font-size: 16px;
    letter-spacing: 1px;

    ${props => props.color && css`
        color: ${props.color};
    `}
`;

export const P2 = styled.p<ITypograhpy>`
    font-family: PixelSplitter;
    font-size: 8px;
    line-height: 12px;

    ${media.xs`
        font-size: 10px;
    `}

    ${media.md`
        font-size: 14px;
    `}

    ${props => props.color && css`
        color: ${props.color};
    `}
`;