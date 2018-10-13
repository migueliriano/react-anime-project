import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Container } from 'style/base';

const NavBarContainer = styled.div``;

const NavBar = props => (
  <NavBarContainer>
    <Container>
      {props.children}
    </Container>
  </NavBarContainer>
);

export default NavBar;
