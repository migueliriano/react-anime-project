import Styled from 'styled-components';

/**
 * This return a `div` component element
 *
 * @export const @type {Component}
 *
 * @return {Component} Returns a new component with the style applied
 */
export const CardContainer = Styled.div`
  width: 60vw;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

/**
 * This return a `div` component element
 *
 * @export const @type {Component}
 *
 * @return {Component} Returns a new component with the style applied
 */
export const Header = Styled.div`
  padding-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
`;

/**
 * This return a `div` component element
 *
 * @export const @type {Component}
 *
 * @return {Component} Returns a new component with the style applied
 */
export const BodyContainer = Styled.div`
  padding: 10px;
  background-color: #f3f3f3;
  border: 1px solid #d0cdcd;
  line-height: 30px;
  border-radius: 2px;
`;
