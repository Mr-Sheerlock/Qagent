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
                    <Text 
                        mb={1}
                        fontSize="sm" 
                        fontWeight="700"
                        bgGradient="linear(135deg, #06b6d4, #3b82f6)"
                        bgClip="text"
                        letterSpacing="wide"
                        textTransform="uppercase"
                        style={{
                            textShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
                        }}
                    >
                        Output
                    </Text>
                </div>
                <div className="button">
                    <Button
                        ml={4}
                        mb={2}
                        isLoading={isLoading}
                        onClick={runModuleDB}
                        bg="linear-gradient(135deg, #10b981, #059669)"
                        color="white"
                        fontWeight="700"
                        fontSize="md"
                        px={8}
                        py={6}
                        borderRadius="16px"
                        border="1px solid"
                        borderColor="rgba(16, 185, 129, 0.5)"
                        boxShadow="0 6px 24px rgba(16, 185, 129, 0.35), 0 0 30px rgba(16, 185, 129, 0.15)"
                        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                        position="relative"
                        overflow="hidden"
                        leftIcon={
                            <Box 
                                as="span" 
                                fontSize="lg"
                                transition="transform 0.3s ease"
                                _groupHover={{transform: "translateX(2px)"}}
                            >
                                ▶
                            </Box>
                        }
                        _before={{
                            content: '""',
                            position: "absolute",
                            top: "-50%",
                            left: "-50%",
                            width: "200%",
                            height: "200%",
                            bg: "linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
                            transform: "rotate(45deg)",
                            transition: "all 0.5s ease",
                        }}
                        _hover={{
                            bg: "linear-gradient(135deg, #34d399, #10b981)",
                            transform: "translateY(-3px) scale(1.02)",
                            boxShadow: "0 10px 36px rgba(16, 185, 129, 0.5), 0 0 50px rgba(16, 185, 129, 0.25)",
                            borderColor: "rgba(52, 211, 153, 0.7)",
                        }}
                        _active={{
                            transform: "translateY(-1px) scale(1)",
                            boxShadow: "0 4px 18px rgba(16, 185, 129, 0.4)",
                        }}
                        _loading={{
                            opacity: 0.8,
                        }}
                        role="group"
                    >
                        Run Module
                    </Button>
                </div>
            </div>
            
            <div className="labelButtonWrapper">
                <div className="label">
                    <Text 
                        mb={1}
                        fontSize="sm" 
                        fontWeight="700"
                        bgGradient="linear(135deg, #06b6d4, #3b82f6)"
                        bgClip="text"
                        letterSpacing="wide"
                        textTransform="uppercase"
                        style={{
                            textShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
                        }}
                    >
                        Code Test Pair
                    </Text>
                </div>
                <div className="button">
                    <CodeTestSelector outputType={dboutputType} onSelectOutputType={OnSelectDBOutputType} isDisabledOutputType={isDisabledOutputType} />
                </div>
            </div>
        </div>
        <div className="label">
                <Text 
                    mb={2} 
                    mt={3} 
                    fontSize="sm"
                    fontWeight="700"
                    bgGradient="linear(to-r, #06b6d4, #3b82f6)"
                    bgClip="text"
                    letterSpacing="wide"
                    textTransform="uppercase"
                    color="transparent"
                    sx={{
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 0 15px rgba(6, 182, 212, 0.4))'
                    }}
                >
                  💻 Similar Code
                </Text>
          </div>
        <Box
          borderRadius="20px"
          overflow="hidden"
          border="1px solid"
          borderColor="rgba(6, 182, 212, 0.3)"
          boxShadow="0 8px 32px rgba(6, 182, 212, 0.2), 0 0 60px rgba(6, 182, 212, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.08)"
          bg="rgba(10, 10, 30, 0.4)"
          backdropFilter="blur(16px)"
          transition="all 0.3s ease"
          _hover={{
            borderColor: "rgba(6, 182, 212, 0.5)",
            boxShadow: "0 12px 48px rgba(6, 182, 212, 0.3), 0 0 80px rgba(6, 182, 212, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.12)"
          }}
        >
          <Editor
              options={{
                minimap: {
                  enabled: false,
                },
                fontSize: 14,
                fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
                lineHeight: 1.6,
                padding: { top: 16, bottom: 16 },
                scrollBeyondLastLine: false,
                smoothScrolling: true,
              }}
              height= "30vh"
              theme="vs-dark"
              language={language}
              onMount={onMount}
              value={SimilarCodeOutput}
              onChange={(SimilarCodeOutput) => setSimilarCodeOutput(SimilarCodeOutput)}
            />
        </Box>
          <div className="label">
                <Text 
                    mb={2} 
                    mt={3} 
                    fontSize="sm"
                    fontWeight="700"
                    bgGradient="linear(to-r, #10b981, #34d399)"
                    bgClip="text"
                    letterSpacing="wide"
                    textTransform="uppercase"
                    color="transparent"
                    sx={{
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 0 15px rgba(16, 185, 129, 0.4))'
                    }}
                >
                  🧪 Unit Tests
                </Text>
          </div>
          <Box
            borderRadius="20px"
            overflow="hidden"
            border="1px solid"
            borderColor="rgba(16, 185, 129, 0.3)"
            boxShadow="0 8px 32px rgba(16, 185, 129, 0.2), 0 0 60px rgba(16, 185, 129, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.08)"
            bg="rgba(10, 10, 30, 0.4)"
            backdropFilter="blur(16px)"
            transition="all 0.3s ease"
            _hover={{
              borderColor: "rgba(16, 185, 129, 0.5)",
              boxShadow: "0 12px 48px rgba(16, 185, 129, 0.3), 0 0 80px rgba(16, 185, 129, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.12)"
            }}
          >
            <Editor
              options={{
                minimap: {
                  enabled: false,
                },
                fontSize: 14,
                fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
                lineHeight: 1.6,
                padding: { top: 16, bottom: 16 },
                scrollBeyondLastLine: false,
                smoothScrolling: true,
              }}
              height= "35.5vh"
              theme="vs-dark"
              language={language}
              onMount={onMount}
              value={UnitTestOutput}
              onChange={(UnitTestOutput) => setUnitTestOutput(UnitTestOutput)}
            />
          </Box>
    </div>
  );
};
export default DBOutput;
