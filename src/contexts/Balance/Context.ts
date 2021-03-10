import { createContext } from 'react';

import { ContextValues } from './types';

export const BalanceContext = createContext<ContextValues>({});
