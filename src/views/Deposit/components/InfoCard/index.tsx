import React from 'react';
import styled from 'styled-components';
import { media } from 'components/breakpoints';
import { colors } from 'components/theme';

// Components
import { H1, P2 } from 'components/Typography';

// Assets
import {ReactComponent as FarmSvg } from 'assets/icons/farm.svg';

export const InfoCard: React.FC = () => {
    return (
        <StyledHeader>
            <StyledHeaderLeft>
                <div id={'farm-title'}>
                    <StyledFarmContainer>
                        <FarmSvg />
                    </StyledFarmContainer>
                    <H1 color={colors.white}>Vale’s Farm</H1>
                </div>
            </StyledHeaderLeft>
            <StyledHeaderRight>
                <StyledLine />
                <div id={'estimated-reward'}>
                    <P2 color={colors.white}>Estimated Reward</P2>
                    <StyledRewardText color={colors.white}>00.0000000Wpokt*</StyledRewardText>
                </div>
            </StyledHeaderRight>
            {/* <div>Inner Info Cards</div>
            <div>More Info</div> */}
        </StyledHeader>
    )
}

const StyledFarmContainer = styled.div`
    height: 3rem;
    margin-right: 2rem;
    width: 3.2rem;

    ${media.sm`
        height: 4rem;
        margin-right: 2rem;
        width: 4.2rem;
    `}
`;

const StyledHeader = styled.div`
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

const StyledHeaderLeft = styled.div`
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

const StyledHeaderRight = styled.div`
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

const StyledLine = styled.div`
    background: ${colors.red};
    height: 4px;
    width: 100%;

    ${media.sm`
        height: 22px;
        margin: 0 1rem 0 0;
        width: 4px;
    `}
`;

const StyledRewardText = styled.p`
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
