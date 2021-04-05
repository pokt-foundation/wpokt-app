import { createGlobalStyle } from 'styled-components';

import PixelSplitter from 'fonts//PixelSplitter-Bold.ttf';

export default createGlobalStyle`
    @font-face {
        font-family: 'PixelSplitter';
        src: url(${PixelSplitter});
        font-weight: 700;
        font-style: normal;
    }
`;
