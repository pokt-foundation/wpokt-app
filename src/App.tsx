import React from 'react';
import styled from 'styled-components';
import GlobalFonts from 'fonts/font';

// Assets
import PocktWorldImage from 'assets/images/pockt_world.png';

// Components
import Navigation from 'components/Navigation';

const App: React.FC = () => {
  return (
    <Wrapper>
      <GlobalFonts />
      <Navigation />
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  background-image: url(${PocktWorldImage});
  background-position: top;
  background-size: cover;
  height: 100vh;
  width: 100%;
  z-index: 0;
`
