import styled, { css } from 'styled-components';
import { media } from './breakpoints';

interface ISpacer {
    size?: 'xs' | 'sm' | 'md' | 'lg';
}

const Spacer = styled.div<ISpacer>`
    height: 100px;

    ${props => props.size === 'xs' && css`
        height: 10px;

        ${media.xs`
            height: 15px;
        `}
    `}

    ${props => props.size === 'sm' && css`
        height: 20px;

        ${media.xs`
            height: 25px;
        `}
    `}

    ${props => props.size === 'md' && css`
        height: 25px;

        ${media.xs`
            height: 50px;
        `}
    `}

    ${props => props.size === 'lg' && css`
        height: 75px;

        ${media.xs`
            height: 100px;
        `}
    `}
`;

export default Spacer;
