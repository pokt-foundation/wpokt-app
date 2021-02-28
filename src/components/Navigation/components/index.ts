import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { media } from 'components/breakpoints';
import { colors } from 'components/theme';

export const StyledConnectWalletButton = styled.button`
    align-items: center;
    background: transparent;
    border: 3px solid ${colors.white};
    color: ${colors.white};
    display: flex;
    font-family: PixelSplitter;
    font-size: 8px;
    height: 32px;
    justify-content: space-around;
    letter-spacing: 3px;
    transition: all .3s ease;
    width: 110px;

    &:hover,
    &:active,
    &:focus {
        border: 3px solid ${colors.yellow};
        color: ${colors.yellow};
        cursor: pointer;
    }

    ${media.xs`
        font-size: 10px;
        height: 38px;
        width: 130px;
    `}

    ${media.md`
        font-size: 12px;
        letter-spacing: 5px;
        width: 150px;
    `}

    ${media.lg`
        letter-spacing: 6px;
        height: 45px;
        width: 190px;
    `}

    ${media.xl`
        font-size: 14px;
        height: 55px;
        width: 225px;
    `}
`;

export const StyledLink = styled(NavLink)`
    color: ${colors.white};
    text-decoration: none;
    transition: all .3s ease;

    &:focus {
        color: ${colors.yellow};
    }
    &.active {
        color: ${colors.yellow};
    }
`;

export const StyledLogoContainer = styled.div`
    fill: ${colors.white};
    height: 19px;
    transition: all .3s ease;
    width: 100px;

    &:hover {
        cursor: pointer;
        fill: ${colors.yellow};
    }

    ${media.xs`
        height: 28px;
        width: 150px;
    `}

    ${media.lg`
        height: 37px;
        width: 200px;
    `}

    ${media.xl`
        height: 43px;
        width: 225px;
    `}
`;

export const StyledMetaMaskImageContainer = styled.div`
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 15px;
    width: 15px;

    ${media.xs`
        height: 20px;
        width: 20px;
    `}

    ${media.md`
        height: 25px;
        width: 25px;
    `}

    ${media.lg`
        height: 30px;
        width: 30px;
    `}

    ${media.xl`
        height: 35px;
        width: 35px;
    `}
`

export const StyledNavigationContainer = styled.div`
    align-items: center;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    height: 80px;
    justify-content: space-between;
    padding: 0 1em;
    position: sticky;
    top: 20px;
    width: auto;
    z-index: 999;

    ${media.md`
        padding: 0 2em;
    `}

    ${media.lg`
        padding: 0 4em;
    `}

    ${media.xl`
        height: 100px;
    `}
`;

export const StyledNavigationItems = styled.nav`
    color: ${colors.white};
    display: none;
    font-size: 10px;
    font-wight: 700;
    text-transform: uppercase;

    ${media.sm`
        display: block;
    `}

    ${media.md`
        font-size: 12px;
    `}

    ${media.xl`
        font-size: 14px;
    `}

    ul {
        align-items: center;
        display: flex;
        justify-content: space-between;
        width: 400px;

        ${media.md`
            width: 540px;
        `}

        ${media.lg`
            width: 620px;
        `}

        ${media.xl`
            width: 700px;
        `}

        li {
            transition: all .3s ease;
            letter-spacing: 3px;

            ${media.md`
                letter-spacing: 5px;
            `}

            ${media.lg`
                letter-spacing: 6px;
            `}
            
            &:hover {
                color: ${colors.yellow};
                cursor: pointer;
            }
        }
    }
`;

export const StyledSandwichMenuContainer = styled.div`
    display: block;
    fill: ${colors.white};
    margin-left: 1em;
    transition: all .3s ease;

    &:hover,
    &:active,
    &:focus {
        cursor: pointer;
        fill: ${colors.yellow};
    }

    ${media.sm`
        display: none;
    `}
`;
