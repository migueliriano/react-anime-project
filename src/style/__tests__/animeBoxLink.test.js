import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import {
  LinkBoxAnime,
  BoxDetail,
  Title,
  Detail,
  Type,
  AverageRank,
} from '../animeBoxLink';


describe('BoxDetail style components', () => {
  it('Should render a LinkBoxAnime', () => {
    const tree = renderer.create(
      <MemoryRouter>
        <LinkBoxAnime to="/" />
      </MemoryRouter>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render a BoxDetail Component', () => {
    const tree = renderer.create(<BoxDetail />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render a Title Component', () => {
    const tree = renderer.create(<Title />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render a Detail Component', () => {
    const tree = renderer.create(<Detail />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render a Type Component', () => {
    const tree = renderer.create(<Type />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render a AverageRank Component', () => {
    const tree = renderer.create(<AverageRank />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
