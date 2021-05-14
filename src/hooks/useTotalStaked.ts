import React from 'react';
import { TotalStakedContext } from 'contexts/TotalStaked';

export interface ContextValues {
  // eslint-disable-next-line
  totalStaked?: any;
}

// eslint-disable-next-line
const useTotalStaked = (): ContextValues => {
  return { ...React.useContext(TotalStakedContext) };
};

export default useTotalStaked;
