import styled, { css } from 'styled-components';
import { media } from './breakpoints';

interface ISpacer {
    size?: 'xs' | 'sm' | 'md' | 'lg';
}

const Spacer = styled.div<ISpacer>`
    height: 10rem;

    ${(props) =>
        props.size === 'xs' &&
        css`
            height: 1rem;

            ${media.xs`
            height: 1.5rem;
        `}
        `}

    ${(props) =>
        props.size === 'sm' &&
        css`
            height: 2rem;

            ${media.xs`
            height: 2.5rem;
        `}
        `}

    ${(props) =>
        props.size === 'md' &&
        css`
            height: 2.5rem;

            ${media.xs`
            height: 5rem;
        `}
        `}

    ${(props) =>
        props.size === 'lg' &&
        css`
            height: 7.5rem;

            ${media.xs`
            height: 10rem;
        `}
        `}
`;

export default Spacer;
