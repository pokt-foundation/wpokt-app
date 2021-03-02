import styled from 'styled-components';
import { media } from 'components/breakpoints';
import { colors } from 'components/theme';

export const StyledDepositHeader = styled.div`
    align-items: flex-start;
    background: #000;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 75px;
    justify-content: space-between;
    padding: 2rem 2rem 1.5rem;

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

export const StyledDepositInputContainer = styled.div`
    align-items: center;
    flex-direction: column;
    justify-content: center;
    display: flex;

    ${media.sm`
        position: relative;
    `}

    input {
        background: transparent;
        border: 3px solid #000000;
        box-sizing: border-box;
        font-family: PixelSplitter;
        font-size: 9px;
        height: 60px;
        justify-content: space-between;
        letter-spacing: 1px;
        outline: none;
        padding: 2rem;
        width: 100%;
    
        ${media.xs`
            height: 80px;
            font-size: 14px;
            padding: 2.5rem 3rem;
        `}
    
        ${media.sm`
            font-size: 16px;
            padding: 3rem;
        `}

        ${media.md`
            font-size: 18px;
        `}
    
        ${media.xl`
            height: 90px;
        `}
    }

    button {
        background: transparent;
        border: none;
        margin: 1.5rem auto 1rem;
        outline: none;
        position: block;
        transition: all .1s ease;

        &:hover {
            cursor: pointer;
        }

        &:active {
            cursor: pointer;
            transform: translateY(2px);
        }

        ${media.xs`
            margin: 2rem auto 1rem;
        `}

        ${media.sm`
            position: absolute;
            margin: 0;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);

            &:hover {
                transform: translateY(-52%);
            }

            &:active {
                transform: translateY(-48%);
            }
        `}
    }
`;

export const StyledMaxButton = styled.button`
    align-items: center;
    background: transparent;
    border: none;
    display: flex;
    height: 1.5rem;
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
        transition: all .2s ease;
        width: 1rem;

        ${media.xs`
            height: 1.6rem;
            width: 1.6rem;
        `}
    }

    &:hover {
        cursor: pointer;

        div#max-selector-svg {
            transform: rotate(90deg) translateX(-2px);
        }
    }

    &:active {
        cursor: pointer;

        div#max-selector-svg {
            transform: rotate(90deg) translateX(2px);
        }
    }

    ${media.xs`
        height: 2rem;
        margin-left: 2rem;
    `}

    ${media.sm`
        margin-left: 1rem;
    `}
`;
