import { useState, useRef } from "react";
import { Box, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";
import { Editor } from "@monaco-editor/react";
import "../styling/app.css";
import DBOutput from "./DBOutput";
import ClassicalOutput from "./ClassicalOutput"; 
import FixBugsOutput from "./FixBugsOutput"; 
import VulnerabilitiesOutput from "./VulnerabilitiesOutput";
import QagentAiOutput from "./QagentAiOutput";

const Output = ({ editorRef,description, language,module, functionName, testCasesInputs, testCasesOutputs, sliderValue, slider2Value }) => {

  return (
    <Box w="50%">
      {module==="Unit Tests Retrieval" && <DBOutput editorRef={editorRef} language={language} thresholSameLang={sliderValue} thresholDiffLang={slider2Value}/>}
      {module==="Generate Unit Tests" && <ClassicalOutput editorRef={editorRef} language={language}/>}
      {module==="Fix Bugs" && <FixBugsOutput editorRef={editorRef} language={language} functionName={functionName} testCasesInputs={testCasesInputs} testCasesOutputs={testCasesOutputs}/>}
      {module==="Find Vulnerabilities" && <VulnerabilitiesOutput editorRef={editorRef} />}
      {module==="QAgent.AI" && <QagentAiOutput editorRef={editorRef} description={description} language={language}/>}
    </Box>
  );
};
export default Output;
