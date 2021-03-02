import styled, { css } from 'styled-components';
import { media } from 'components/breakpoints';
import { colors } from 'components/theme';

interface IStyledButtonLarge {
    active: boolean;
}

export const StyledButtonLarge = styled.button<IStyledButtonLarge>`
    background: transparent;
    border: none;
    font-family: PixelSplitter;
    font-size: 8px;
    height: 40px;
    letter-spacing: 3px;
    outline: none;
    position: relative;
    transition: all .3s ease;
    width: 50%;

    &:hover {
        cursor: pointer;
    }

    ${props => props.active && css`
        background: ${colors.yellowLight};
    `}

    ${media.xs`
        font-size: 10px;
        height: 50px;
        letter-spacing: 7px;
    `}

    ${media.sm`
        font-size: 14px;
        letter-spacing: 14px;
    `}

    ${media.md`
        font-size: 16px;
        letter-spacing: 16px;
    `}

    ${media.lg`
        font-size: 18px;
    `}

    ${media.xl`
        font-size: 20px;
        height: 60px;
    `}
`;


export const StyledDepositHeader = styled.div`
    align-items: flex-start;
    background: #000;
    display: flex;
    flex-direction: column;
    height: 90px;
    justify-content: space-between;
    padding: 2rem;

    ${media.xs`
        height: 100px;
        padding: 2.5rem 3rem;
    `}

    ${media.sm`
        align-items: center;
        flex-direction: row;
        height: 50px;
        padding: 3rem;
    `}

    ${media.xl`
        height: 60px;
    `}
`;

export const StyledMaxButton = styled.button`
    align-items: center;
    background: transparent;
    border: none;
    display: flex;
    height: 2rem;
    justify-content: center;
    margin-left: 1rem;
    outline: none;

    div#max-svg {
        align-items: center;
        display: flex;
        height: 1rem;
        width: 2.7rem;

        ${media.xs`
            height: 2rem;
            width: 5.4rem;
        `}
    }

    div#max-selector-svg {
        align-items: center;
        display: flex;
        fill: ${colors.yellow};
        height: .8rem;
        margin-left: .8rem;
        transform: rotate(90deg);
        width: 1rem;

        ${media.xs`
            height: 1.6rem;
            width: 1.6rem;
        `}
    }

    &:hover {
        cursor: pointer;
    }

    ${media.xs`
        height: 2rem;
        margin-left: 2rem;
    `}

    ${media.sm`
        margin-left: 1rem;
    `}
`;

export const StyledSelectorContainer = styled.div`
    height: 14px;
    left: 10px;
    overflow: hidden;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 14px;

    ${media.xs`
        height: 16px;
        left: 12px;
        width: 16px;
    `}

    ${media.sm`
        height: 22px;
        left: 20px;
        width: 22px;
    `}
`;
