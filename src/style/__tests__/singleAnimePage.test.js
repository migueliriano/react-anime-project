import React from 'react';
import renderer from 'react-test-renderer';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import toJson from 'enzyme-to-json';

import { shallow } from 'enzyme';

import {
  SinglePageContainer,
  CircularProgressStyle,
  CharacterBodyContainer,
  LogoLinkContainer,
  ColumnAnimeinfo,
  ColumnBodyPage,
} from '../singleAnimePage';

const muiTheme = getMuiTheme();
describe('singleAnimePage style components', () => {
  it('Should render a SinglePageContainer Component', () => {
    const tree = renderer.create(<SinglePageContainer />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render a CircularProgressStyle Component', () => {
    const tree = shallow(
      <CircularProgressStyle />,
      {
        context: muiTheme,
      },
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('Should render a CharacterBodyContainer Component', () => {
    const tree = renderer.create(<CharacterBodyContainer />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render a LogoLinkContainer Component', () => {
    const tree = renderer.create(<LogoLinkContainer />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render a ColumnAnimeinfo Component', () => {
    const tree = renderer.create(<ColumnAnimeinfo />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render a ColumnBodyPage Component', () => {
    const tree = renderer.create(<ColumnBodyPage />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
