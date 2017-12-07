import React from 'react';

import {
  CharacterBox,
  CharacterName,
  CharacterImage,
} from '../characterBoxInfo';

describe('characterBoxInfo style components', () => {
  it('Should render a CharacterBox Component', () => {
    const tree = renderer.create(<CharacterBox />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render a CharacterName Component', () => {
    const tree = renderer.create(<CharacterName />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render a CharacterImage Component', () => {
    const tree = renderer.create(<CharacterImage />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
