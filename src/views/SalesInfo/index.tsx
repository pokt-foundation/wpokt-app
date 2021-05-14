import React from 'react';
import 'styled-components/macro';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { colors } from 'components/theme';

import {
  PartnersContainer,
  ResourcesLink,
  SalesInfoStatCard,
  StyledChartContainer,
  StyledContentContainer,
  StyledContentTextContainer,
  StyledInfoCard,
  StyledResourcesContainer,
} from 'views/SalesInfo/components';
import { Card, InnerCardContainer } from 'components/Cards';
import { Flex } from 'components/Containers';
import Spacer from 'components/Spacer';
import { H1, H2, P1, P2 } from 'components/Typography';

const data = [
  {
    date: 'May 20th',
    price: 4000,
  },
  {
    date: 'May 21st',
    price: 3000,
  },
  {
    date: 'May 23rd',
    price: 2000,
  },
  {
    date: 'May 24th',
    price: 2780,
  },
  {
    date: 'May 25th',
    price: 1890,
  },
  {
    date: 'May 26th',
    price: 2390,
  },
  {
    date: 'May 27th',
    price: 3490,
  },
];

const SalesInfo: React.FC = () => {
  return (
    <>
      <Spacer size={'md'} />
      <Card>
        <InnerCardContainer borderBottom={false}>
          <StyledContentContainer>
            <StyledInfoCard>
              <P2 color={colors.white} center={true}>
                {' '}
                Welcome to the wPOKT distribution event. This distribution is the first opportunity to acquire wPOKT
                that will enable holders to participate in wPOKT. The distribution will occur on Balancer using a
                Liquidity Bootstrapping Pool. Before participating in wPOKT, we highly encourage users to read all of
                the wPOKT documentation and information located in the links below. Welcome aboard and happy farming.
              </P2>
              <Spacer size={'md'} />
              <H2 color={colors.white} center={true}>
                WPOKT: 0,00006373 USDC/ DAI
              </H2>
            </StyledInfoCard>
          </StyledContentContainer>
          <Spacer size={'md'} />
          <Flex
            css={`
              flex-wrap: wrap;
            `}
            align={'flex-start'}
            justify={'space-between'}
          >
            <div>
              <SalesInfoStatCard statContent={'2:00:00:00'} statTitle={'Sale Ends'} />
              <Spacer size={'xs'} />
            </div>
            <div>
              <SalesInfoStatCard statContent={'1.98 USDC'} statTitle={'Latest Price'} />
              <Spacer size={'xs'} />
            </div>
            <div>
              <SalesInfoStatCard statContent={'4,080'} statTitle={'Farmers'} />
              <Spacer size={'md'} />
            </div>
            <div>
              <SalesInfoStatCard statContent={'9,332,236 USDC'} statTitle={'USDC Traded'} />
              <Spacer size={'md'} />
            </div>
          </Flex>
          <StyledContentContainer>
            <StyledContentTextContainer>
              <H1 color={colors.white}>wPOKT Liquidity bootstrapping Event</H1>
            </StyledContentTextContainer>
            <StyledChartContainer>
              <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 50,
                  right: 30,
                  left: 20,
                  bottom: 30,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis tickMargin={20} dataKey="date" />
                <YAxis />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (payload && payload.length) {
                      return (
                        <div className="custom-tooltip">
                          <P2>{label}</P2>
                          <P2 color={colors.green}>Price: {payload[0].value} USDC</P2>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line strokeWidth={4} type="monotone" dataKey="price" stroke={colors.green} activeDot={{ r: 8 }} />
              </LineChart>
            </StyledChartContainer>
            <StyledContentTextContainer>
              <P1 color={colors.white}>Price movement if nobody buys</P1>
              <Spacer size={'xs'} />
              <P2 color={colors.red}>89% wPokt sold</P2>
            </StyledContentTextContainer>
          </StyledContentContainer>
          <Spacer size={'md'} />
          <StyledContentContainer>
            <StyledContentTextContainer>
              <H1 color={colors.white}>Launch Partners</H1>
            </StyledContentTextContainer>
            <PartnersContainer />
          </StyledContentContainer>
          <Spacer size={'md'} />
          <StyledContentContainer>
            <StyledContentTextContainer>
              <H1 color={colors.white}>Resources</H1>
            </StyledContentTextContainer>
            <StyledResourcesContainer>
              <ResourcesLink route={'/'} text={'Get wPOKT'} />
              <ResourcesLink route={'/'} text={'Balancer Pool'} />
              <ResourcesLink href={'https://forum.pokt.network/t/wpokt-faq/780'} text={'wPOKT FAQ'} />
              <ResourcesLink route={'/'} text={'Distribution FAQ'} />
              <ResourcesLink
                href={'https://forum.pokt.network/t/introducing-wpokt-a-regenerative-farming-program/378'}
                text={'Green Paper'}
              />
              <ResourcesLink href={'https://pokt.network/'} text={'Pocket Network'} />
            </StyledResourcesContainer>
          </StyledContentContainer>
        </InnerCardContainer>
      </Card>
      <Spacer size={'lg'} />
    </>
  );
};

export default SalesInfo;
