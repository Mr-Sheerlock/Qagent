import { useRef, useState } from "react";
import { Box, HStack, Text, Textarea } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import ModuleSelector from "./ModuleSelector";
import { CODE_SNIPPETS,DESCRIPTION } from "../constants.js";
import "../styling/app.css"
import Output from "./Output";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("python");
  const[module, setModule] = useState("Unit Tests Retrieval");
  const [description, setDescription] = useState(DESCRIPTION);
  const [isDisabledLanguage, setIsDisabledLanguage] = useState(true);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const onSelectModule = (module) => {
    setModule(module);
    setValue(CODE_SNIPPETS[module]);
    if ( module=== "Unit Tests Retrieval") {
      setIsDisabledLanguage(false);
    }
    else{
      setIsDisabledLanguage(true);
      setLanguage("python");
      setValue(CODE_SNIPPETS["python"]);
    }
  }

  
  return (
    <Box>
      <HStack spacing={4}>
        <Box w="50%">
          <div className="buttons">
            <div className="labelButtonWrapper">
              <div className="label">
                <Text mb={2} mt={2} fontSize="lg">
                  Task
                </Text>
              </div>
              <div className="button">
                <ModuleSelector module={module} onSelectModule={onSelectModule} />
              </div>
            </div>
            {/* {module === "Unit Tests Retrieval" &&  */}
            <div className="labelButtonWrapper">
              <div className="label">
                <Text mb={2} mt={2} fontSize="lg">
                  Language
                </Text>
              </div>
              <div className="button">
                <LanguageSelector language={language} onSelect={onSelect} isDisabledLanguage={isDisabledLanguage} />
              </div>
            </div>
          </div>
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height={module === "QAgent.AI" ? "45vh" : "75vh"}
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
          />
          {module === "QAgent.AI" && 
          <Textarea
            height="27vh"
            marginTop="3vh"
            value={description}
            defaultValue={DESCRIPTION}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Enter description"
          />}
        </Box>
        <Output editorRef={editorRef} description={description} language={language} module={module}/>
      </HStack>
    </Box>
  );
};
export default CodeEditor;
