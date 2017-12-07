import React from 'react';

import {
  MainInfoContainer,
  PosterContainer,
  PosterImage,
  AnimeDetails,
  Row,
  TitleDetail,
  Detail,
} from '../animeMainInfo';

describe('animeMainInfo style components', () => {
  it('Should render a MainInfoContainer Component', () => {
    const tree = renderer.create(<MainInfoContainer />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render a PosterContainer Component', () => {
    const tree = renderer.create(<PosterContainer />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render a PosterImage Component', () => {
    const tree = renderer.create(<PosterImage />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render a AnimeDetails Component', () => {
    const tree = renderer.create(<AnimeDetails />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render a Row Component', () => {
    const tree = renderer.create(<Row />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render a TitleDetail Component', () => {
    const tree = renderer.create(<TitleDetail />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render a Detail Component', () => {
    const tree = renderer.create(<Detail />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
