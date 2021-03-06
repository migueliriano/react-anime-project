
import Styled from 'styled-components';

/**
 * `section` element with the style applied
 *
 * @export const @type {Component}
 *
 * @return {Component} Returns a new component with the style applied
 */
const GridContainer = Styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 30px;
  max-width: 1600px;
  margin: 0 auto;
`;

export default GridContainer;
