import React from 'react';
import styled, { css } from 'styled-components';
import { media } from 'components/breakpoints';
import { colors } from 'components/theme';

// Components
import Spacer from 'components/Spacer';

// Assets
import { ReactComponent as CaretSvg } from 'assets/icons/caret.svg';
import { ReactComponent as MultiplierSvg } from 'assets/icons/multiplier.svg';
import { ReactComponent as QuestionMarkSvg } from 'assets/icons/question_mark.svg';

interface ISmallInfoCard {
    statContent: string;
    statTitle: string;
    statType: 'question' | 'multiplier';
}

export const SmallInfoCard: React.FC<ISmallInfoCard> = ({
    statContent,
    statTitle,
    statType
}) => {
    return (
        <StyledSmallInfoCard>
            <StyledSmallInfoCardHeader>
                <StyledStatText color={colors.white}>{statTitle}</StyledStatText>
                {statType === 'question' ? <QuestionMarkSvg /> :<MultiplierSvg /> }
            </StyledSmallInfoCardHeader>
            <StyledSmallInfoCardContent>
                <StyledStatText color={'#000'}>{statContent}</StyledStatText>
            </StyledSmallInfoCardContent>
        </StyledSmallInfoCard>
    )
}

const StyledSmallInfoCard = styled.div`
    border: 3px solid #000000;
    width: 12rem;

    ${media.xs`
        width: 19rem;
    `}

    ${media.sm`
        width: 12.5rem;
    `}

    ${media.md`
        width: 16.5rem;
    `}

    ${media.lg`
        width: 20rem;
    `}

    ${media.xl`
        width: 30rem;
    `}
`;

const StyledSmallInfoCardContent = styled.div`
    padding: 1.5rem 1rem;

    ${media.xs`
        padding: 2rem 1rem;
    `}
`;

const StyledSmallInfoCardHeader = styled.div`
    align-items: center;
    background: #000;
    display: flex;
    justify-content: space-between;
    padding: 1rem;

    svg {
        &:hover {
            cursor: pointer;
        }
    }
`;

interface ITypograhpy {
    color?: string;
}

export const StyledStatText = styled.p<ITypograhpy>`
    font-family: PixelSplitter;
    font-size: 9px;

    ${media.xs`
        font-size: 14px;
    `}

    ${media.sm`
        font-size: 9px;
    `}

    ${media.md`
        font-size: 12px;
        letter-spacing: 1px;
    `}

    ${media.lg`
        font-size: 14px;
    `}

    ${media.xl`
        font-size: 18px;
    `}

    ${props => props.color && css`
        color: ${props.color};
    `}
`;

export const SmallInfoCardExtraLinks: React.FC = () => {
    return (
        <StyledExtraLinksContainer>
            <StyledExtraLinksButton>
                Stats
                <CaretSvg />
            </StyledExtraLinksButton>
            <Spacer size={'xs'} />
            <StyledExtraLinksButton>
                FAQ
                <CaretSvg />
            </StyledExtraLinksButton>
        </StyledExtraLinksContainer>
    )
}

const StyledExtraLinksContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 9rem;
    justify-content: center;
    width: 12rem;

    ${media.xs`
        height: 10rem;
        width: 19rem;
    `}

    ${media.sm`
        display: none;
    `}
`;

const StyledExtraLinksButton = styled.button`
    align-items: center;
    background: #000;
    border: none;
    color: ${colors.white};
    display: flex;
    font-family: PixelSplitter;
    font-size: 14px;
    height: 5rem;
    justify-content: space-between;
    outline: none;
    padding: 0 2rem;
    width: 100%;
`;