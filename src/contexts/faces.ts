import { API } from 'bnc-notify';
import { API as OnboardAPI, Wallet } from 'libs/faces';

export interface ContextValues {
  address?: string | null;
  network?: string | null;
  balance?: any;
  onboard?: OnboardAPI | null;
  provider?: any;
  wallet?: Wallet | Record<string, never>;
  notify?: API | null;
}
