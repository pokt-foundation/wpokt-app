import React from 'react';
import styled from 'styled-components';

// Assets
import PocktWorldImage from 'assets/images/pockt_world.png';

const App: React.FC = () => {
  return (
    <Wrapper>
      
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  background-image: url(${PocktWorldImage});
  background-position: center;
  background-size: center;
  height: 100vh;
  width: 100%;
  z-index: 0;
`
