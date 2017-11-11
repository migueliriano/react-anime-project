
import Styled from 'styled-components';

/**
 * This return a `div` element as component with the style applied
 *
 * @export const @type {Component}
 *
 * @return {Component} Returns a new component with the style applied
 */
export const CharacterBox = Styled.div`
  text-align: center;
  margin-right: 20px;
  margin-bottom: 20px;
`;

/**
 * This return a `div` element as component with the style applied
 *
 * @export const @type {Component}
 *
 * @return {Component} Returns a new component with the style applied
 */
export const CharacterName = Styled.div`
  font-weight: 'bold';
  max-width: 100px;
  line-height: '20px';
`;

/**
 * This return a `img` element as component with the style applied
 *
 * @export const @type {Component}
 *
 * @return {Component} Returns a new component with the style applied
 */
export const CharacterImage = Styled.img`
  max-width: 100px;
  height: 150px;
`;
