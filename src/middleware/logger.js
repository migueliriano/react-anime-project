
/* eslint-disable no-console */
const logger = store => next => (action) => {
  console.group(action.type);
  console.info('dispatching', action);
  console.log('prev state', store.getState());
  const result = next(action);
  console.log('next state', store.getState());
  console.log('result', result);
  return result;
};
/* eslint-enable */

export default logger;
