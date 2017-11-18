import React from 'react';
import renderer from 'react-test-renderer';

import {
  Container,
  Wrapper,
  Header,
} from '../base';


describe('base style components', () => {
  it('Should render a Container Component', () => {
    const tree = renderer.create(<Container />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render a Wrapper Component', () => {
    const tree = renderer.create(<Wrapper />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render a Header Component', () => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
