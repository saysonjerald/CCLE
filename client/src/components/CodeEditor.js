import React, { useEffect, useRef, useState } from 'react';
import { CodemirrorBinding } from 'y-codemirror';
import { UnControlled as CodeMirrorEditor } from 'react-codemirror2';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import './CodeMirrorDependecies/Editor.css';
import RandomColor from 'randomcolor';
import './CodeMirrorDependecies/EditorAddons';

export function Editor(props) {
  const [EditorRef, setEditorRef] = useState(null);
  const [code, setCode] = useState('');

  const handleEditorDidMount = (editor) => {
    setEditorRef(editor);
  };

  useEffect(() => {
    if (EditorRef) {
      const ydoc = new Y.Doc(); //create a ydoc

      let provider = null;
      try {
        provider = new WebrtcProvider('Any Room Name', ydoc, {
          //Remember the other tab or
          //other user should be in same room for seeing real-time changes
          signaling: [
            'wss://signaling.yjs.dev',
            'wss://y-webrtc-signaling-eu.herokuapp.com',
            'wss://y-webrtc-signaling-us.herokuapp.com',
          ],
        });

        const yText = ydoc.getText('codemirror');

        const yUndoManager = new Y.UndoManager(yText);

        const awareness = provider.awareness; //awareness is what makes other user aware about your actions

        const color = RandomColor(); //Provied any random color to be used for each user

        awareness.setLocalStateField('user', {
          name: 'Users Name',
          color: color,
        });

        const getBinding = new CodemirrorBinding(yText, EditorRef, awareness, {
          yUndoManager,
        });
      } catch (err) {
        alert('error in collaborating try refreshing or come back later !');
      }
      return () => {
        if (provider) {
          provider.disconnect(); //We destroy doc we created and disconnect
          ydoc.destroy(); //the provider to stop propagting changes if user leaves editor
        }
      };
    }
  }, [EditorRef]);

  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        fontSize: '20px',
        overflowY: 'auto',
      }}
    >
      <CodeMirrorEditor
        onChange={(editor, data, value) => {
          setCode(value);
        }}
        autoScroll
        options={{
          mode: 'text/x-c++src', //this is for c++,  you can visit https://github.com/atharmohammad/Code-N-Collab/blob/master/src/Function/languageMapper.js  for other language types
          theme: 'monokai',
          lineWrapping: true,
          smartIndent: true,
          lineNumbers: true,
          foldGutter: true,
          tabSize: 2,
          gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
          autoCloseTags: true,
          matchBrackets: true,
          autoCloseBrackets: true,
          extraKeys: {
            'Ctrl-Space': 'autocomplete',
          },
        }}
        editorDidMount={(editor) => {
          handleEditorDidMount(editor);
          editor.setSize('100vw', '100%');
        }}
      />
    </div>
  );
}
