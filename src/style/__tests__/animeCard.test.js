import React from 'react';

import {
  CardContainer,
  Header,
  BodyContainer,
} from '../animeCard';


describe('animeCard style components', () => {
  it('Should render a CardContainer Component', () => {
    const tree = renderer.create(<CardContainer />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render a Header Component', () => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render a BodyContainer Component', () => {
    const tree = renderer.create(<BodyContainer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
