import styled from 'styled-components';

// Assets
import PocktWorldImage from 'assets/images/pockt_world.png';

const Wrapper = styled.div`
    background-image: url(${PocktWorldImage});
    background-position: top;
    background-size: cover;
    min-height: 100vh;
    width: 100%;
    z-index: 0;
`;

export default Wrapper;
