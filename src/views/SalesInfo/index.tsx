import React from 'react';
import styled from 'styled-components';
import { colors, GU } from 'components/theme';

import { Card, InnerCardContainer } from 'components/Cards';
import Spacer from 'components/Spacer';
import { H1, P1, P2 } from 'components/Typography';

const SalesInfo: React.FC = () => {
  return (
    <>
      <Spacer size={'md'} />
      <Card>
        <InnerCardContainer borderBottom={false}>
          <StyledGraphContainer>
            <StyledGraphTextContainer>
              <H1 color={colors.white}>wPOKT Liquidity bootstrapping Event</H1>
            </StyledGraphTextContainer>
            <div>Graph</div>
            <StyledGraphTextContainer>
              <P1 color={colors.white}>Price movement if nobody buys</P1>
              <Spacer size={'xs'} />
              <P2 color={colors.red}>89% wPokt sold</P2>
            </StyledGraphTextContainer>
          </StyledGraphContainer>
        </InnerCardContainer>
      </Card>
      <Spacer size={'lg'} />
    </>
  );
};

export default SalesInfo;

const StyledGraphContainer = styled.div`
  border: ${GU}px solid #000;
`;

const StyledGraphTextContainer = styled.div`
  background: #000;
  display: flex;
  flex-direction: column;
  padding: ${5 * GU}px;
  width: 100%;
`;
