import { useRef } from 'react';
import MonacoEdit, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';

import './codeEditor.scss';
import './syntax.scss';

interface CodeEditorProps {
  initValue: string;
  onChange(val: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initValue, onChange }) => {
  const editorRef = useRef<any>();

  const onEditorDidMount: EditorDidMount = (getVal, monacoEditor) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getVal());
    });
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });

    const highlighter = new Highlighter(
      // @ts-ignore
      window.monaco,
      codeShift,
      monacoEditor
    );
    highlighter.highLightOnDidChangeModelContent(
      () => {},
      () => {},
      undefined,
      () => {},
    );
  };

  const onFormatClick = () => {
    const unformatted = editorRef.current.getModel().getValue();
    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');
    editorRef.current.setValue(formatted);
  };

  return (
    <div className='editor-wrapper'>
      <button className='button button-format is-primary is-small' onClick={onFormatClick}>Format</button>
      <MonacoEdit
        value={initValue}
        editorDidMount={onEditorDidMount}
        theme='dark'
        language='javascript'
        height="100%"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  )
};

export default CodeEditor;