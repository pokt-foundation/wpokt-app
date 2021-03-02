import React from 'react';
import styled from 'styled-components';
import { media } from 'components/breakpoints';
import { colors } from 'components/theme';

// Components
import {
    StyledFarmContainer,
    StyledHeader,
    StyledHeaderLeft,
    StyledHeaderRight,
    StyledLine,
    StyledRewardText,
} from './components';
import { H1, P2 } from 'components/Typography';

// Assets
import {ReactComponent as FarmSvg } from 'assets/icons/farm.svg';

export const InfoCard: React.FC = () => {
    return (
        <div>
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
            </StyledHeader>
        </div>
    )
}
