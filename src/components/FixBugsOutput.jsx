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
                    <Text 
                        mb={1}
                        fontSize="sm" 
                        fontWeight="700"
                        bgGradient="linear(135deg, #f59e0b, #f97316)"
                        bgClip="text"
                        letterSpacing="wide"
                        textTransform="uppercase"
                        style={{
                            textShadow: '0 0 20px rgba(249, 115, 22, 0.3)'
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
                        onClick={runModuleFixBugs}
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
        </div>
        <Box
          borderRadius="20px"
          overflow="hidden"
          border="1px solid"
          borderColor="rgba(245, 158, 11, 0.3)"
          boxShadow="0 8px 32px rgba(245, 158, 11, 0.2), 0 0 60px rgba(245, 158, 11, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.08)"
          bg="rgba(10, 10, 30, 0.4)"
          backdropFilter="blur(16px)"
          transition="all 0.3s ease"
          _hover={{
            borderColor: "rgba(245, 158, 11, 0.5)",
            boxShadow: "0 12px 48px rgba(245, 158, 11, 0.3), 0 0 80px rgba(245, 158, 11, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.12)"
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
              height= "75vh"
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
export default FixBugsOutput;
