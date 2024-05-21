import { useState, useRef } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";
import { Editor } from "@monaco-editor/react";
import "../styling/app.css";

import { handleFixBugsModule } from "../handlers/modulehandlers";

const FixBugsOutput = ({ editorRef,language, functionName, testCasesInputs, testCasesOutputs }) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [UnitTestOutput, setUnitTestOutput] = useState("");
  const [isError, setIsError] = useState(false);
  
  const unitTestEditorRef = useRef();
  const onMount = (unitTestEditor) => {
    unitTestEditorRef.current = unitTestEditor;
    unitTestEditor.focus();
  };

  const runModuleFixBugs = async () => {
    //set the output to null
    setUnitTestOutput(null);
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode || sourceCode.trim() === "" ){ 
      toast({
        title: "Please enter your code!",
        status: "error",
        duration: 6000,
      });  
      return
    };
    if (!functionName || functionName.trim() === "" ){ 
      toast({
        title: "Please enter function name!",
        status: "error",
        duration: 6000,
      });  
      return
    };
    if (!testCasesInputs || testCasesInputs.trim() === "" ){ 
      toast({
        title: "Please enter test cases inputs!",
        status: "error",
        duration: 6000,
      });  
      return
    };
    if (!testCasesOutputs || testCasesOutputs.trim() === "" ){ 
      toast({
        title: "Please enter test cases outputs!",
        status: "error",
        duration: 6000,
      });  
      return
    };
    //check if the test cases inputs and outputs are of same lengths
    let testCasesInputsList, testCasesOutputsList;
    try {
      //convert the test cases inputs and outputs to list of lists [[input1,input2,...],[]] and output [[output1,output2,...],[]]
      testCasesInputsList = testCasesInputs.split(/\n{2,}/).map(testCase => testCase.split("\n"));
      testCasesOutputsList = testCasesOutputs.split(/\n{2,}/).map(testCase => testCase.split("\n"));
      if (testCasesInputsList.length !== testCasesOutputsList.length){
        toast({
          title: "Test cases inputs and outputs are not of same length!",
          status: "error",
          duration: 6000,
        });  
        return
      }
      console.log(testCasesInputsList);
      console.log(testCasesOutputsList);
    }catch (error) {
      console.log(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    }
    try {
      setIsLoading(true);
      await handleFixBugsModule(sourceCode, functionName, testCasesInputsList, testCasesOutputsList, setIsError, setUnitTestOutput, toast);
      
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
                        onClick={runModuleFixBugs}
                    >
                        Run Module
                    </Button>
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
export default FixBugsOutput;
