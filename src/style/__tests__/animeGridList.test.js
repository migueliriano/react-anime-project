import React from 'react';

import GridContainer from '../animeGridList';

describe('animeGridList style components', () => {
  it('Should render a GridContainer Component', () => {
    const tree = renderer.create(<GridContainer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
