import React from 'react';

import { Card, InnerCardContainer } from 'components/Cards';
import Spacer from 'components/Spacer';

const ProposeApp: React.FC = () => {
  return (
    <>
      <Spacer size={'md'} />
      <Card>
        <InnerCardContainer borderBottom={false}>Propose App</InnerCardContainer>
      </Card>
      <Spacer size={'lg'} />
    </>
  );
};

export default ProposeApp;
