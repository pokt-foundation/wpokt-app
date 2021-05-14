import React from 'react';
import styled, { css } from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
import { media } from 'components/breakpoints';
import { colors, GU } from 'components/theme';

import { ReactComponent as CaretSvg } from 'assets/icons/caret.svg';
import { P2 } from 'components/Typography';

interface IResourcesLink {
  href?: string;
  route?: string;
  text: string;
}

export const ResourcesLink: React.FC<IResourcesLink> = ({ href, route, text }) => {
  const history = useHistory();

  return (
    <>
      {route && (
        <StyledLinkButton color={colors.yellow} onClick={() => history.push(route)}>
          <P2 color={colors.white}>{text}</P2>
          <div>
            <CaretSvg />
          </div>
        </StyledLinkButton>
      )}
      {href && (
        <StyledLinkButton color={colors.yellow}>
          <a
            css={`
              text-decoration: none;
            `}
            href={href}
            target={'_blank'}
            rel={'noreferrer noopener'}
          >
            <P2 color={colors.white}>{text}</P2>
          </a>
          <div>
            <CaretSvg />
          </div>
        </StyledLinkButton>
      )}
    </>
  );
};

interface IStyledLinkButton {
  color: string;
}

const StyledLinkButton = styled.button<IStyledLinkButton>`
  align-items: center;
  border: ${GU}px solid #000000;
  display: flex;
  justify-content: center;
  margin-bottom: ${4 * GU}px;
  padding: ${3 * GU}px;
  position: relative;
  width: 100%;

  &:hover {
    cursor: pointer;
  }

  ${media.xs`
    margin-bottom: ${8 * GU}px;
    width: 48%;
  `}

  ${(props) =>
    props.color &&
    css`
      background: ${props.color};
    `}

  div {
    position: absolute;
    right: ${4 * GU}px;
  }
`;
