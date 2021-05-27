import './syntax.scss';
import styles from './CodeEditor.module.scss';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import { useRef } from 'react';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';

interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue,
  onChange
}) => {
  const editorRef = useRef<any>();

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;

    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });

    monacoEditor.getModel()?.updateOptions({
      tabSize: 2,
    });

    const highlighter = new Highlighter(
      // @ts-ignore
      window.monaco,
      codeShift,
      monacoEditor
    );
    highlighter.highLightOnDidChangeModelContent(
      () => { },
      () => { },
      undefined,
      () => { }
    );
  };

  const onFormatClick = () => {
    const unformattedCode = editorRef.current.getModel()?.getValue();
    const formattedCode = prettier.format(unformattedCode, {
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true,
    }).replace(/\n$/, '');
    editorRef.current.getModel().setValue(formattedCode);
  };

  return (
    <div className={styles.editorWrapper}>
      <button
        className={`button button-format is-primary is-small ${styles.buttonFormat}`}
        onClick={onFormatClick}>Format</button>
      <MonacoEditor
        language='javascript'
        height='100%'
        editorDidMount={onEditorDidMount}
        value={initialValue}
        theme='dark'
        options={{
          wordWrap: 'on',
          minimap: {
            enabled: false
          },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};