import { useState, useRef } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";
import { Editor } from "@monaco-editor/react";
import "../styling/app.css";
import OutputSelector from "./OutputSelector";
import CodeTestSelector from "./CodeTestSelector";
import { handleClassicalModule, handleDBModule, handleFixBugsModule, handleVulnerabilitiesModule, handleQAgentAIModule } from "../handlers/modulehandlers";

const Output = ({ editorRef,description, language,module }) => {
  const toast = useToast();
  const [output, setOutput] = useState(null);
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
        // setUnitTestOutput("Joseph");
      }
      else if (outputType === "Decision") {
        setUnitTestOutput(llmOutput[1]);
        // setUnitTestOutput("Omar");
      }
      else if (outputType === "Bug Fix") {
        setUnitTestOutput(llmOutput[2]);
        // setUnitTestOutput("karim");
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
    if (!sourceCode ){ 
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
        await handleDBModule(sourceCode, setIsError, setUnitTestOutput, toast, setDBOutput,setIsDisabledOutputType);
      } else if (module === "Fix Bugs") {
        await handleFixBugsModule(sourceCode, setIsError, setUnitTestOutput, toast);
      } else if (module === "Find Vulnerabilities") {
        await handleVulnerabilitiesModule(sourceCode, setIsError, setUnitTestOutput, toast);
      } else if (module === "QAgent.AI") {
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
      setIsLoading(false);
    }
  };

  return (
    <Box w="50%">
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
        {/* {output
          ? output.map((line, i) => <Text key={i} style={{whiteSpace: "pre-wrap"}}>{line}</Text>)
          : 'Click "Run Module" to see the output here'} */}
      {/* <Box
        height="75vh"
        p={2}
        color={isError ? "red.400" : ""}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
      >
      </Box> */}
    </Box>
  );
};
export default Output;
