import 'raf/polyfill';
import 'jest-styled-components';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import toJson from 'enzyme-to-json';

configure({ adapter: new Adapter() });

global.fetchMock = fetchMock;
global.renderer = renderer;
global.configureStore = configureStore;
global.thunk = thunk;
global.shallow = shallow;
global.toJson = toJson;
