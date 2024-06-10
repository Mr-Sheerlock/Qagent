import { useState, useRef } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";
import { Editor } from "@monaco-editor/react";
import "../styling/app.css";
import TestsCoverageSelector from "./TestsCoverageSelector";
import {  handleClassicalModule } from "../handlers/modulehandlers";

const ClassicalOutput = ({ editorRef,language }) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [UnitTestOutput, setUnitTestOutput] = useState("");
  const [moduleOutput, setModuleOutput] = useState("");
  const [isError, setIsError] = useState(false);
  const [outputType, setOutputType] = useState("Unit Tests");
  const [isDisabledOutputType, setIsDisabledOutputType] = useState(true);
  const [out, setOut] = useState("");

  const unitTestEditorRef = useRef();
  const onMount = (unitTestEditor) => {
    unitTestEditorRef.current = unitTestEditor;
    unitTestEditor.focus();
  };

  const onSelectOutputType = (outputType) => {
    setOutputType(outputType);
    //output is waiting for the response from the server
    if (moduleOutput!==""){
      if (outputType === "Unit Tests") {
        setUnitTestOutput(moduleOutput[0]);
      }
      else if (outputType === "Coverage Report") {
        const newOut = `Branch Coverage: ${moduleOutput[2][0]}%\nStatement Coverage: ${moduleOutput[2][1]}%\nTime Consumed: ${moduleOutput[2][2]}`;
        setOut(newOut);
        setUnitTestOutput(newOut);
      }
    }
    else{
      setIsDisabledOutputType(true);
    }
  }

  const runModuleClassical = async () => {
    //set the output to null
    setUnitTestOutput(null);
    //disable the output type
    setIsDisabledOutputType(true);
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode || sourceCode.trim() === ""){ 
      toast({
        title: "Please enter your code!",
        status: "error",
        duration: 6000,
      });  
      return
    };
    try {
      setIsLoading(true);
      // make the output type for the llm to be Test Generation
      setOutputType("Unit Tests");
      await handleClassicalModule(sourceCode, setIsError, setUnitTestOutput, toast, setModuleOutput,setIsDisabledOutputType);
      
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (  
    <div>
        <div className="buttons">
            <div className="labelButtonWrapper">
                <div className="label">
                    <Text mb={2} mt={2} fontSize="lg">
                    Output
                    </Text>
                </div>
                <div className="button">
                    <Button
                        variant="outline"
                        colorScheme="green"
                        ml={4}
                        mb={2}
                        isLoading={isLoading}
                        onClick={runModuleClassical}
                    >
                        Run Module
                    </Button>
                </div>
                <div className="button">
                    <TestsCoverageSelector outputType={outputType} onSelectOutputType={onSelectOutputType} isDisabledOutputType={isDisabledOutputType} />
                </div>
            </div>
        </div>
        <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height= "75vh"
            theme="vs-dark"
            language={language}
            onMount={onMount}
            value={UnitTestOutput}
            onChange={(UnitTestOutput) => setUnitTestOutput(UnitTestOutput)}
          />
      </div>
  );
};
export default ClassicalOutput;
