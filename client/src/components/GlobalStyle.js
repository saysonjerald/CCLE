import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
body::-webkit-scrollbar {
  width: 1em;
}
 
body::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

body::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: rgb(107, 107, 107);
    min-height: 24px;
    border: 2px solid rgb(43, 43, 43);
}

a:link,
a:visited {
  text-decoration: none;
  color: white;
}
`;
export default GlobalStyle;
