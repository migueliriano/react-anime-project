import Styled from 'styled-components';
import CircularProgress from 'material-ui/CircularProgress';

/**
 * This return a `div` component element
 *
 * @export const @type {Component}
 *
 * @return {Component} Returns a new component with the style applied
 */
export const SinglePageContainer = Styled.div``;

/**
 * This modify the style fo the `CircularProgress` component
 *
 * @export const @type {Component}
 *
 * @param {Component} Link - Link component
 *
 * @return {Component} Returns a new component with the style applied
 */
export const CircularProgressStyle = Styled(CircularProgress)`
  margin: 0 auto;
`;

/**
 * This return a `div` element as component with the style applied
 *
 * @export const @type {Component}
 *
 * @return {Component} Returns a new component with the style applied
 */
export const CharacterBodyContainer = Styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

/**
 * This return a `div` element as component with the style applied
 *
 * @export const @type {Component}
 *
 * @return {Component} Returns a new component with the style applied
 */
export const LogoLinkContainer = Styled.div`
  text-align: center;
  display: block;
`;

/**
 * This return a `div` element as component with the style applied
 *
 * @export const @type {Component}
 *
 * @return {Component} Returns a new component with the style applied
 */
export const ColumnAnimeinfo = Styled.div`
  margin-left: 15px;
  display: inline-block;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
    text-align: center;
    margin-bottom: 30px;
  }
`;

/**
 * This return a `div` element as component with the style applied
 *
 * @export const @type {Component}
 *
 * @extends {ColumnAnimeinfo} - This extends of `ColumnAnimeinfo` component
 *
 * @return {Component} Returns a new component with the style applied
 */
export const ColumnBodyPage = ColumnAnimeinfo.extend`
  margin-left: 50px;
  vertical-align: top;
`;
