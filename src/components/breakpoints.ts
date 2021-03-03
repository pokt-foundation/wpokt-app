import type { ThemedCssFunction, BaseThemedCssFunction } from 'styled-components';
import { css } from 'styled-components';

const sizes = {
    xs: 480, // 27%
    sm: 768, // 43%
    md: 992, // 55%
    lg: 1200, // 67%
    xl: 1800,
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
