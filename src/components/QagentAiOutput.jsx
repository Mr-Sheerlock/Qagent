import { useState, useRef } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";
import { Editor } from "@monaco-editor/react";
import "../styling/app.css";
import OutputSelector from "./OutputSelector";
import {  handleQAgentAIModule } from "../handlers/modulehandlers";

const QagentAiOutput = ({ editorRef,description,language }) => {
  const toast = useToast();
  const [UnitTestOutput, setUnitTestOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [llmOutput, setLlmOutput] = useState("");
  const [isError, setIsError] = useState(false);
  const [outputType, setOutputType] = useState("Test Generation");
  const [isDisabledOutputType, setIsDisabledOutputType] = useState(true);

  const unitTestEditorRef = useRef();
  const onMount = (unitTestEditor) => {
    unitTestEditorRef.current = unitTestEditor;
    unitTestEditor.focus();
  };

  const onSelectOutputType = (outputType) => {
    setOutputType(outputType);
    //output is waiting for the response from the server
    if (llmOutput!==""){
      if (outputType === "Test Generation") {
        setUnitTestOutput(llmOutput[0]);
      }
      else if (outputType === "Decision") {
        setUnitTestOutput(llmOutput[1]);
      }
      else if (outputType === "Bug Fix") {
        setUnitTestOutput(llmOutput[2]);
      }
    }
    else{
      setIsDisabledOutputType(true);
    }
  }

  const runModuleQagentAi = async () => {
    //set the output to null
    setUnitTestOutput(null);
    //disable the output type
    setIsDisabledOutputType(true);
    // setOutput(null);
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode || sourceCode.trim() === ""){ 
      toast({
        title: "Please enter your code!",
        status: "error",
        duration: 6000,
      });  
      return
    };
    if (!description){
        toast({
          title: "Please enter the description!",
          status: "error",
          duration: 6000,
        });  
        return
      };
    try {
        setIsLoading(true);
        // make the output type for the llm to be Test Generation
        setOutputType("Test Generation");
        await handleQAgentAIModule(sourceCode,description, setIsError, setUnitTestOutput, toast, setLlmOutput,setIsDisabledOutputType);
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
                        onClick={runModuleQagentAi}
                    >
                        Run Module
                    </Button>
                </div>
                <div className="button">
                    <OutputSelector outputType={outputType} onSelectOutputType={onSelectOutputType} isDisabledOutputType={isDisabledOutputType} />
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
export default QagentAiOutput;
