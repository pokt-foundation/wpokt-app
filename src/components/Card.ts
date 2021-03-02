import styled from 'styled-components';
import { media } from 'components/breakpoints';

export const Card = styled.div`
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.6);
    border: 3px solid #000000;
    box-sizing: border-box;
    margin: 0 auto;
    min-height: 10rem;
    padding: 1rem;
    width: 30rem;

    ${media.xs`
        border: 5px solid #000000;
        padding: 1.5rem;
        width: 48rem;
    `}

    ${media.sm`
        padding: 3rem;
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
`