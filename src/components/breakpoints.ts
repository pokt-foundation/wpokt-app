import type { ThemedCssFunction, BaseThemedCssFunction } from 'styled-components';
import { css } from 'styled-components';
import { GU } from 'components/theme';

const sizes = {
  xs: 120 * GU, // 27%
  sm: 192 * GU, // 43%
  md: 248 * GU, // 55%
  lg: 300 * GU, // 67%
  xl: 450 * GU,
};

// Iterate through the sizes and create a media template
export const media = (Object.keys(sizes) as (keyof typeof sizes)[]).reduce(
  (acc, label) => {
    // eslint-disable-next-line
    acc[label] = (first: any, ...interpolations: any[]) => css`
      @media (min-width: ${sizes[label]}px) {
        ${css(first, ...interpolations)}
      }
    `;

    return acc;
  },
  // eslint-disable-next-line
  {} as { [key in keyof typeof sizes]: ThemedCssFunction<BaseThemedCssFunction<any[]>>},
);
