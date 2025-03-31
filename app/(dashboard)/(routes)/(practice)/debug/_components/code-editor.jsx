import { Editor } from "@monaco-editor/react";
import { useCallback, useRef, useState } from "react";
import LanguageSelector from "./language-selector";
import CODE_SNIPPETS from "@/app/constants";

const CodeEditor = () => {
  const editorRef = useRef();
  const [language, setLanguage] = useState("python")
  const [value, setValue] = useState("In def greet(name) {\n\tprint (\"Hello, + name + '!\") \n In\ngreet (\"Alex\") ; In'");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (selectedLanguage) => {
    setValue(CODE_SNIPPETS[selectedLanguage]);
  };

  return (
    <div className="p-6">
      <LanguageSelector language={language} onSelect={onSelect} />
      <Editor
        height="75vh"
        theme="vs-dark"
        language="python"
        defaultValue={CODE_SNIPPETS[language]}
        value={value}
        onMount={onMount}
        onChange={(value) => setValue(value)}
      />
    </div>
  );
};

export default CodeEditor;

