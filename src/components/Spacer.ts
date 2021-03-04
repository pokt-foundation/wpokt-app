import styled, { css } from 'styled-components';
import { media } from 'components/breakpoints';
import { GU } from 'components/theme';

interface ISpacer {
  size: 'xs' | 'sm' | 'md' | 'lg';
}

const Spacer = styled.div<ISpacer>`
  ${(props) =>
    props.size === 'xs' &&
    css`
      height: ${2 * GU}px;

      ${media.xs`
            height: ${3 * GU}px;
        `}
    `}

  ${(props) =>
    props.size === 'sm' &&
    css`
      height: ${5 * GU}px;

      ${media.xs`
            height: ${6 * GU}px;
        `}
    `}

    ${(props) =>
    props.size === 'md' &&
    css`
      height: ${6 * GU}px;

      ${media.xs`
            height: ${12 * GU}px;
        `}
    `}

    ${(props) =>
    props.size === 'lg' &&
    css`
      height: ${18 * GU}px;

      ${media.xs`
            height: ${25 * GU}px;
        `}
    `}
`;

export default Spacer;
