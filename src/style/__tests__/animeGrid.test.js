import React from 'react';
import renderer from 'react-test-renderer';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import toJson from 'enzyme-to-json';

import { shallow } from 'enzyme';

import {
  LoadMoreContainer,
  CircularProgressStyle,
  GridContainer,
} from '../animeGrid';

const muiTheme = getMuiTheme();

describe('animeGrid style components', () => {
  it('Should render a LoadMoreContainer Component', () => {
    const tree = renderer.create(<LoadMoreContainer />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render a CircularProgressStyle Component', () => {
    const tree = shallow(
      <CircularProgressStyle />,
      {
        context: { muiTheme },
      },
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('Should render a GridContainer Component', () => {
    const tree = renderer.create(<GridContainer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
