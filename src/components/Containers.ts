import styled, { css } from 'styled-components';

interface IFlex {
    align?: string;
    direction?: string;
    full?: boolean;
    justify?: string;
}

export const Flex = styled.div<IFlex>`
    display: flex;

    ${(props) =>
        props.align &&
        css`
            align-items: ${props.align};
        `}

    ${(props) =>
        props.direction &&
        css`
            flex-direction: ${props.direction};
        `}

    ${(props) =>
        props.full === true &&
        css`
            height: 100%;
            width: 100%;
        `}

    ${(props) =>
        props.justify &&
        css`
            justify-content: ${props.justify};
        `}
`;
