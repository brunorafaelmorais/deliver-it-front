import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  .float-action {
    position: fixed;
    bottom: 16px;
    right: 16px;
  }

  .back-button {
    margin-top: 4px;
    margin-left: 4px;
  }
`;

export default GlobalStyle;
