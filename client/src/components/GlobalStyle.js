import { createGlobalStyle } from 'styled-components';
import 'react-chat-theme/lib/styles.css';

const GlobalStyle = createGlobalStyle`
*::-webkit-scrollbar {
  width: 1em;
}
 
*::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

*::-webkit-scrollbar-thumb {
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

video::-webkit-media-controls {
  display: none;
}

.CodeMirror {
  height: 100vh;
}

.CodeMirror-simplescroll-horizontal div, .CodeMirror-simplescroll-vertical div {
  position: absolute;
  background: #ccc;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid #bbb;
  border-radius: 2px;
}

.CodeMirror-simplescroll-horizontal, .CodeMirror-simplescroll-vertical {
  position: absolute;
  z-index: 6;
  background: #eee;
}

.CodeMirror-simplescroll-horizontal {
  bottom: 0; left: 0;
  height: 8px;
}
.CodeMirror-simplescroll-horizontal div {
  bottom: 0;
  height: 100%;
}

.CodeMirror-simplescroll-vertical {
  right: 0; top: 0;
  width: 8px;
}
.CodeMirror-simplescroll-vertical div {
  right: 0;
  width: 100%;
}


.CodeMirror-overlayscroll .CodeMirror-scrollbar-filler, .CodeMirror-overlayscroll .CodeMirror-gutter-filler {
  display: none;
}

.CodeMirror-overlayscroll-horizontal div, .CodeMirror-overlayscroll-vertical div {
  position: absolute;
  background: #bcd;
  border-radius: 3px;
}

.CodeMirror-overlayscroll-horizontal, .CodeMirror-overlayscroll-vertical {
  position: absolute;
  z-index: 6;
}

.CodeMirror-overlayscroll-horizontal {
  bottom: 0; left: 0;
  height: 6px;
}
.CodeMirror-overlayscroll-horizontal div {
  bottom: 0;
  height: 100%;
}

.CodeMirror-overlayscroll-vertical {
  right: 0; top: 0;
  width: 6px;
}
.CodeMirror-overlayscroll-vertical div {
  right: 0;
  width: 100%;
}


//ChatBox
.rcw-launcher, .rcw-conversation-container {
 box-shadow: none;
 background-color: #6EBB4E;
}

.rcw-conversation-container .rcw-header {
  background-color: #6EBB4E;
  border-bottom: 1px solid #999;
}

.rcw-client .rcw-message-text {
  background-color: #6EBB4E;
}

.rcw-response .rcw-message-text {
  background-color: #97d47c;
}

.rcw-message {
  height: 50px;
}

.rcw-header {
  height: 55px;
}

.rcw-header span {
  display: none;
  
}

.rcw-conversation-container .rcw-title {
  padding: 0 20px;
  text-align: left;
}

.rcw-messages-container {
  height: 300px;
}

`;
export default GlobalStyle;
