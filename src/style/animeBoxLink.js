import Styled from 'styled-components';

import { Link } from 'react-router-dom';

/**
 * This modify the style fo the `Link` component
 *
 * @export const @type {Component}
 *
 * @param {Component} Link - Link component
 *
 * @return {Component} Returns a new component with the style applied
 */
export const LinkBoxAnime = Styled(Link)`
  display: inline-block;
  position: relative;
  margin-right: 30px;
  margin-bottom: 30px;
  text-align: center;
  padding: 15px;
  width: 13vw;
  height: 20vw;
  background-size: cover;
  color: #fff;
  border-radius: 5px;
  background-image: url(${props => props.backgroundImage});

  @media (max-width: 768px) {
    width: 33vw;
    height: 40vw;
  }

  @media (max-width: 600px) {
    width: 100%;
    height: 90vw;
    margin-right: 0px
  }
`;

/**
 * `div` element will container for the detail box element
 *
 * @export const @type {Component}
 *
 * @return {Component} Returns a new component with the style applied
 */
export const BoxDetail = Styled.div`
  background: #000;
  height: 5vw;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background: linear-gradient(bottom,rgba(0,0,0,1), rgba(0,0,0,.4));
  background: -webkit-linear-gradient(bottom,rgba(0,0,0,1),rgba(0,0,0,.4));
  border-bottom-right-radius:5px;
  border-bottom-left-radius:5px;
  padding-top: 15px;

  @media (max-width: 768px) {
    height: 10vw;
  }

  @media (max-width: 600px) {
    height: 23vw;
  }
`;

/**
 * `div` element will container a title text
 *
 * @export const @type {Component}
 *
 * @return {Component} Returns a new component with the style applied
 */
export const Title = Styled.div`
  font-size: 1.1vw;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 2vw;
  }

  @media (max-width: 600px) {
    font-size: 5vw;
  }
`;

/**
 * `div` element will container a detail text
 *
 * @export const @type {Component}
 *
 * @return {Component} Returns a new component with the style applied
 */
export const Detail = Styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  font-size: 1.1vw;

  @media (max-width: 768px) {
    font-size: 2vw;
  }

  @media (max-width: 600px) {
    font-size: 4vw;
  }
`;

/**
 * `span` element will container a type text
 *
 * @export const @type {Component}
 *
 * @return {Component} Returns a new component with the style applied
 */
export const Type = Styled.span`
  color: #53c4ff;
  font-weight: bold;
  text-transform: uppercase;
`;

/**
 * `span` element will container a averageRank text,
 * extending all the style properties of `Type` component
 *
 * @export const @type {Component}
 *
 * @extends {Type} - This extends of `Type` component
 *
 * @return {Component} Returns a new component with the style applied
 */
export const AverageRank = Type.extend`
  margin-left: 15px;
`;
