import rootReducer from '../index';

describe('index rootReducer', () => {
  it('should return a combineReducers function and should be defined', () => {
    expect(rootReducer).toBeDefined();
  });
});
