import { useState, useRef } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";
import { Editor } from "@monaco-editor/react";
import "../styling/app.css";
import OutputSelector from "./OutputSelector";
import CodeTestSelector from "./CodeTestSelector";
import VulnerabilitiesOutput from "./VulnerabilitiesOutput";
import { handleClassicalModule, handleDBModule, handleFixBugsModule, handleQAgentAIModule } from "../handlers/modulehandlers";

const Output = ({ editorRef,description, language,module }) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [outputType, setOutputType] = useState("Test Generation");
  const [dboutputType, setdbOutputType] = useState("Code Test Pair 1");
  const [isDisabledOutputType, setIsDisabledOutputType] = useState(true);
  const [llmOutput, setLlmOutput] = useState("");
  const [DBOutput, setDBOutput] = useState("");

  const unitTestEditorRef = useRef();
  const [UnitTestOutput, setUnitTestOutput] = useState("");
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
  const OnSelectDBOutputType= (outputType) => {
    setdbOutputType(outputType);
    console.log(DBOutput);
    if (DBOutput.length!==0){
      if (outputType === "Code Test Pair 1") {
        console.log(DBOutput[0].tests["test 0"]);
        let code= DBOutput[0].code;
        let test= DBOutput[0].tests["test 0"]+'\n'+DBOutput[0].tests["test 1"]+'\n'+DBOutput[0].tests["test 2"];
        setUnitTestOutput(code+'\n'+test);
      }
      else if (outputType === "Code Test Pair 2") {
        let code= DBOutput[1].code;
        let test= DBOutput[1].tests["test 0"]+'\n'+DBOutput[1].tests["test 1"]+'\n'+DBOutput[1].tests["test 2"];
        setUnitTestOutput(code+'\n'+test);
      }
      else if (outputType === "Code Test Pair 3") {
        let code= DBOutput[2].code;
        let test= DBOutput[2].tests["test 0"]+'\n'+DBOutput[2].tests["test 1"]+'\n'+DBOutput[2].tests["test 2"];
        setUnitTestOutput(code+'\n'+test);
      }
    }
    else{
      setIsDisabledOutputType(true);
    }
  }

  const runModule = async () => {
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
    if (module === "QAgent.AI" && !description){
      toast({
        title: "Please enter the description!",
        status: "error",
        duration: 6000,
      });  
      return
    };
    try {
      setIsLoading(true);
      //if i have multiple requests 
      if (module === "Generate Unit Tests") {
        await handleClassicalModule(sourceCode, setIsError, setUnitTestOutput, toast);
      } else if (module === "Unit Tests Retrieval") {
        // make the output type for the DB to be Code Test Pair 1
        setdbOutputType("Code Test Pair 1");
        await handleDBModule(sourceCode, setIsError, setUnitTestOutput, toast, setDBOutput,setIsDisabledOutputType);
      } else if (module === "Fix Bugs") {
        await handleFixBugsModule(sourceCode, setIsError, setUnitTestOutput, toast);
      } else if (module === "QAgent.AI") {
        // make the output type for the llm to be Test Generation
        setOutputType("Test Generation");
        await handleQAgentAIModule(sourceCode,description, setIsError, setUnitTestOutput, toast, setLlmOutput,setIsDisabledOutputType);
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      //check if the module is not vulnerabilities
      if (module !== "Find Vulnerabilities"){
        setIsLoading(false);
      }
    }
  };

  return (
    <Box w="50%">
      {module !== "Find Vulnerabilities"  &&
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
                onClick={runModule}
              >
                Run Module
              </Button>
            </div>
            {module === "QAgent.AI"  && <div className="button">
                <OutputSelector outputType={outputType} onSelectOutputType={onSelectOutputType} isDisabledOutputType={isDisabledOutputType} />
              </div>}
            {module === "Unit Tests Retrieval"  && <div className="button">
              <CodeTestSelector outputType={dboutputType} onSelectOutputType={OnSelectDBOutputType} isDisabledOutputType={isDisabledOutputType} />
            </div>}
          </div>
        </div>
      }
      {module !== "Find Vulnerabilities"  &&
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
          />}
      {module==="Find Vulnerabilities" && <VulnerabilitiesOutput editorRef={editorRef} />}
    </Box>
  );
};
export default Output;
