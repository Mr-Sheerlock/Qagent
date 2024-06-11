import { useState, useRef } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";
import { Editor } from "@monaco-editor/react";
import "../styling/app.css";
import CodeTestSelector from "./CodeTestSelector";
import {  handleDBModule } from "../handlers/modulehandlers";
const DBOutput = ({ editorRef,language, thresholSameLang, thresholDiffLang }) => {
  const toast = useToast();
  const [SimilarCodeOutput, setSimilarCodeOutput] = useState("");
  const [UnitTestOutput, setUnitTestOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dbOutput, setdbOutput] = useState("");
  const [isError, setIsError] = useState(false);
  const [dboutputType, setdbOutputType] = useState("Code Test Pair 1");
  const [isDisabledOutputType, setIsDisabledOutputType] = useState(true);

  const unitTestEditorRef = useRef();
  const onMount = (unitTestEditor) => {
    unitTestEditorRef.current = unitTestEditor;
    unitTestEditor.focus();
  };

  const runModuleDB = async () => {
    //set the output to null
    setSimilarCodeOutput(null);
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
    try {
        setIsLoading(true);
        // make the output type for the DB to be Code Test Pair 1
        setdbOutputType("Code Test Pair 1");
        await handleDBModule(sourceCode, setIsError, setSimilarCodeOutput,setUnitTestOutput, toast, setdbOutput,setIsDisabledOutputType,language ,thresholSameLang, thresholDiffLang);
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
  const OnSelectDBOutputType= (outputType) => {
    setdbOutputType(outputType);
    
    console.log("Select Type");
    console.log(dbOutput);
    if (dbOutput.length!==0){
      if (outputType === "Code Test Pair 1") {
        
        console.log(dbOutput[0].tests["test 0"]);
        let code= dbOutput[0].code;
        // let test= dbOutput[0].tests["test 0"]+'\n'+dbOutput[0].tests["test 1"]+'\n'+dbOutput[0].tests["test 2"];
        let testsLen=Object.keys(dbOutput[0].tests).length
        if (testsLen>3){
          testsLen=3
        }
        let test=""

        for (let i = 0; i < testsLen; i++) {
          test+=dbOutput[0].tests["test "+i]+'\n'
        }

        setSimilarCodeOutput(code);
        setUnitTestOutput(test);
      }
      else if (outputType === "Code Test Pair 2") {
        
        if (dbOutput[1] !== undefined){
          // let test= dbOutput[1].tests["test 0"]+'\n'+dbOutput[1].tests["test 1"]+'\n'+dbOutput[1].tests["test 2"];
          let code= dbOutput[1].code;
          let testsLen=Object.keys(dbOutput[1].tests).length
          if (testsLen>3){
            testsLen=3
          }
          let test=""

          for (let i = 0; i < testsLen; i++) {
            test+=dbOutput[1].tests["test "+i]+'\n'
          }
        setSimilarCodeOutput(code);
        setUnitTestOutput(test);
      }else{
        setSimilarCodeOutput("No Output Found");
        setUnitTestOutput("No Output Found");
      } 
      }
      else if (outputType === "Code Test Pair 3") {
        if (dbOutput[2] !== undefined){
          
          let code= dbOutput[2].code;
          // let test= dbOutput[2].tests["test 0"]+'\n'+dbOutput[2].tests["test 1"]+'\n'+dbOutput[2].tests["test 2"];
          let testsLen=Object.keys(dbOutput[2].tests).length
          if (testsLen>3){
            testsLen=3
          }
          let test=""
          for (let i = 0; i < testsLen; i++) {
            test+=dbOutput[2].tests["test "+i]+'\n'
          }
          setSimilarCodeOutput(code);
          setUnitTestOutput(test);
        }

        }else{
          setSimilarCodeOutput("No Output Found");
          setUnitTestOutput("No Output Found");
        }
    }
    else{
      setIsDisabledOutputType(true);
    }
  }

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
                        onClick={runModuleDB}
                    >
                        Run Module
                    </Button>
                </div>
                
                <div className="button">
                    <CodeTestSelector outputType={dboutputType} onSelectOutputType={OnSelectDBOutputType} isDisabledOutputType={isDisabledOutputType} />
                </div>
            </div>
        </div>
        <div className="label">
                <Text mb={1} mt={1} fontSize="lg">
                  Similar Code :
                </Text>
          </div>
        <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height= "30vh"
            theme="vs-dark"
            language={language}
            onMount={onMount}
            value={SimilarCodeOutput}
            onChange={(SimilarCodeOutput) => setSimilarCodeOutput(SimilarCodeOutput)}
          />
          <div className="label">
                <Text mb={1} mt={1} fontSize="lg">
                  Unit Tests :
                </Text>
          </div>
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height= "35.5vh"
            theme="vs-dark"
            language={language}
            onMount={onMount}
            value={UnitTestOutput}
            onChange={(UnitTestOutput) => setUnitTestOutput(UnitTestOutput)}
          />
    </div>
  );
};
export default DBOutput;
