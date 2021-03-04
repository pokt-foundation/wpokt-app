import styled from 'styled-components';
import { media } from 'components/breakpoints';
import { colors } from 'components/theme';

export const StyledDepositInputContainer = styled.div`
  align-items: center;
  flex-direction: column;
  justify-content: center;
  display: flex;

  ${media.sm`
        position: relative;
    `}

  input {
    background: transparent;
    border: 3px solid #000000;
    box-sizing: border-box;
    font-family: PixelSplitter;
    font-size: 9px;
    height: 60px;
    justify-content: space-between;
    letter-spacing: 1px;
    outline: none;
    padding: 2rem;
    width: 100%;

    ${media.xs`
            height: 80px;
            font-size: 14px;
            padding: 2.5rem 3rem;
        `}

    ${media.sm`
            font-size: 16px;
            padding: 3rem;
        `}

        ${media.md`
            font-size: 18px;
        `}
    
        ${media.xl`
            height: 90px;
        `}
  }

  button {
    background: transparent;
    border: none;
    margin: 1.5rem auto 1rem;
    outline: none;
    position: block;
    transition: all 0.1s ease;

    &:hover {
      cursor: pointer;
    }

    &:active {
      cursor: pointer;
      transform: translateY(2px);
    }

    ${media.xs`
            margin: 2rem auto 1rem;
        `}

    ${media.sm`
            position: absolute;
            margin: 0;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);

            &:hover {
                transform: translateY(-52%);
            }

            &:active {
                transform: translateY(-48%);
            }
        `}
  }
`;

export const StyledHeader = styled.div`
  align-items: flex-start;
  background: #000;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${media.sm`
        align-items: center;
        flex-direction: row;
    `}
`;

export const StyledHeaderLeft = styled.div`
  align-items: center;
  display: flex;

  div#enter-amount {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 2rem 2rem 1.5rem;

    ${media.xs`
            padding: 2rem 2.5rem;
        `}

    ${media.sm`
            padding: 3rem;
        `}
  }
`;

export const StyledHeaderRight = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;

  ${media.sm`
        flex-direction: row;
        width: 34rem;
    `}

  ${media.md`
        width: 43rem;
    `}

    ${media.lg`
        width: 45rem;
    `}

    div#wallet-balance {
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 100%;

    padding: 1.5rem 2rem;

    ${media.xs`
            padding: 2.5rem 3rem;
        `}

    ${media.sm`
            padding: 3rem 3rem 3rem 0;
        `}
  }
`;

export const StyledLine = styled.div`
  background: ${colors.red};
  height: 2px;
  width: 100%;

  ${media.sm`
        display: none;
    `}
`;

export const StyledMaxButton = styled.button`
  align-items: center;
  background: transparent;
  border: none;
  display: flex;
  height: 1.5rem;
  justify-content: center;
  margin-left: 1rem;
  outline: none;

  div#max-svg {
    align-items: center;
    display: flex;
    height: 1rem;
    width: 2.7rem;

    ${media.xs`
            height: 2rem;
            width: 5.4rem;
        `}
  }

  div#max-selector-svg {
    align-items: center;
    display: flex;
    fill: ${colors.yellow};
    height: 0.8rem;
    margin-left: 0.8rem;
    transform: rotate(90deg);
    transition: all 0.2s ease;
    width: 1rem;

    ${media.xs`
            height: 1.6rem;
            width: 1.6rem;
        `}
  }

  &:hover {
    cursor: pointer;

    div#max-selector-svg {
      transform: rotate(90deg) translateX(-2px);
    }
  }

  &:active {
    cursor: pointer;

    div#max-selector-svg {
      transform: rotate(90deg) translateX(2px);
    }
  }

  ${media.xs`
        height: 2rem;
        margin-left: 2rem;
    `}

  ${media.sm`
        margin-left: 1rem;
    `}
`;
