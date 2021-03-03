import styled, { css } from 'styled-components';
import { media } from 'components/breakpoints';

export const Card = styled.div`
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.6);
    border: 3px solid #000000;
    box-sizing: border-box;
    margin: 0 auto;
    min-height: 10rem;
    width: 30rem;

    ${media.xs`
        border: 5px solid #000000;
        width: 48rem;
    `}

    ${media.sm`
        width: 76rem;
    `}

    ${media.md`
        width: 99rem;
    `}

    ${media.lg`
        width: 120rem;
    `}

    ${media.xl`
        width: 180rem;
    `}
`;

interface IInnerCardContainer {
    borderBottom?: boolean;
}

export const InnerCardContainer = styled.div<IInnerCardContainer>`
    padding: 1rem;

    ${media.xs`
        padding: 1.5rem;
    `}

    ${media.sm`
        padding: 3rem;
    `}

    ${(props) =>
        props.borderBottom &&
        css`
            border-bottom: 3px solid #000000;

            ${media.xs`
            border-bottom: 5px solid #000000;
        `}
        `}
`;
