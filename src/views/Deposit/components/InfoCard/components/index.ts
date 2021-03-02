import styled from 'styled-components';
import { media } from 'components/breakpoints';
import { colors } from 'components/theme';

export { SmallInfoCard, SmallInfoCardExtraLinks } from './SmallInfoCard';

export const StyledFarmContainer = styled.div`
    height: 3rem;
    margin-right: 2rem;
    width: 3.2rem;

    ${media.sm`
        height: 4rem;
        margin-right: 2rem;
        width: 4.2rem;
    `}
`;

export const StyledHeader = styled.div`
    align-items: flex-start;
    background: #000;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    ${media.sm`
        align-items: center;
        flex-direction: row;
    `}
`;

export const StyledHeaderLeft = styled.div`
    align-items: center;
    display: flex;

    div#farm-title {
        align-items: center;
        display: flex;
        justify-content: space-between;
        padding: 2rem 2rem 1.5rem;

        ${media.xs`
            padding: 2rem 2.5rem;
        `}

        ${media.sm`
            padding: 3rem;
        `}
    }
`;

export const StyledHeaderRight = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 100%;

    ${media.sm`
        flex-direction: row;
        width: 43rem;
    `}

    ${media.md`
        width: 60rem;
    `}

    ${media.lg`
        width: 80rem;
    `}

    ${media.xl`
        width: 140rem;
    `}

    div#estimated-reward {
        align-items: center;
        display: flex;
        justify-content: space-between;
        width: 100%;

        padding: 1.5rem 2rem;

        ${media.xs`
            padding: 2.5rem 3rem;
        `}

        ${media.sm`
            padding: 3rem 3rem 3rem 0;
        `}
    }
`;

export const StyledLine = styled.div`
    background: ${colors.red};
    height: 2px;
    width: 100%;

    ${media.sm`
        height: 22px;
        margin: 0 1rem 0 0;
        width: 4px;
    `}
`;

export const StyledRewardText = styled.p`
    color: ${colors.white};
    font-family: PixelSplitter;
    font-size: 10px;
    letter-spacing: 1px;

    ${media.xs`
        font-size: 16px;
    `}

    ${media.md`
        font-size: 24px;
    `}
`;


export const StyledSmallInfoCardsContainer = styled.div`
    align-items: center;
    background: #fff;
    border: 3px solid #000000;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    height: 33rem;
    justify-content: space-between;
    padding: 1rem;
    width: 100%;

    ${media.xs`
        height: 40rem;
        padding: 2rem;
    `}

    ${media.sm`
        height: auto;
    `}

    ${media.md`
        padding: 3rem;
    `}
`;
