import styled, { css } from 'styled-components';
import { media } from 'components/breakpoints';
import { GU } from 'components/theme';

export const Card = styled.div`
  backdrop-filter: blur(${3 * GU}px);
  background: rgba(255, 255, 255, 0.6);
  border: ${GU}px solid #000000;
  box-sizing: border-box;
  margin: 0 auto;
  min-height: ${25 * GU};
  width: ${80 * GU}px;

  ${media.xs`
    width: ${120 * GU}px;
	`}

  ${media.sm`
    width: ${190 * GU}px;
  `}

	${media.md`
		width: ${247 * GU}px;
	`}

	${media.lg`
		width: ${300 * GU}px;
	`}

	${media.xl`
		width: ${450 * GU}px;
	`}
`;

interface IInnerCardContainer {
  borderBottom?: boolean;
}

export const InnerCardContainer = styled.div<IInnerCardContainer>`
  padding: ${2 * GU}px;

  ${media.xs`
    padding: ${3 * GU}px;
  `}

  ${media.sm`
    padding: ${7 * GU}px;
  `}

  ${(props) =>
    props.borderBottom &&
    css`
      border-bottom: ${GU}px solid #000000;
    `}
`;
