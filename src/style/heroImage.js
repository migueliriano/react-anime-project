import Styled from 'styled-components';

/**
 * This return a `section` component element
 *
 * @export const @type {Component}
 *
 * @return {Component} Returns a new component with the style applied
 */
export const FullWidthImage = Styled.section`
  height: ${props => (props.backgroundImage ? '25vw' : 'initial')} ;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display:flex;
  margin-bottom: 30px;
  background-image:  url(${props => props.backgroundImage});
  position: relative;
  @media (max-width: 600px) {
    height: 58vw;
  }
`;

/**
 * This return a `div` component element
 *
 * @export const @type {Component}
 *
 * @return {Component} Returns a new component with the style applied
 */
export const AnimeTitle = Styled.div`
  background-color: rgba(0, 0, 0, .6);
  padding-left: 15px;
  color: #fff;
  align-self: flex-end;
  width: 100%;
  padding: 15px 30px;
  font-size: 30px;
  font-weight: bold;
`;
