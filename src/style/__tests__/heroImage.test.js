import React from 'react';

import {
  FullWidthImage,
  AnimeTitle,
} from '../heroImage';

describe('heroImage style components', () => {
  it('Should render a FullWidthImage Component', () => {
    const tree = renderer.create(
      <FullWidthImage backgroundImage="https://goo.gl/VF2jwk" />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render a FullWidthImage but not background image Component', () => {
    const tree = renderer.create(<FullWidthImage />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render a AnimeTitle Component', () => {
    const tree = renderer.create(<AnimeTitle />);
    expect(tree).toMatchSnapshot();
  });
});
