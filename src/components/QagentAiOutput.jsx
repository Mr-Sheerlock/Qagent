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
      // else if (outputType === "Decision") {
      //   setUnitTestOutput(llmOutput[1]);
      // }
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
                    <Text 
                        mb={1}
                        fontSize="sm" 
                        fontWeight="700"
                        bgGradient="linear(135deg, #a78bfa, #8b5cf6)"
                        bgClip="text"
                        letterSpacing="wide"
                        textTransform="uppercase"
                        style={{
                            textShadow: '0 0 20px rgba(139, 92, 246, 0.3)'
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
                        onClick={runModuleQagentAi}
                        bg="linear-gradient(135deg, #10b981, #059669)"
                        color="white"
                        fontWeight="700"
                        fontSize="md"
                        px={8}
                        py={6}
                        borderRadius="14px"
                        border="2px solid"
                        borderColor="rgba(16, 185, 129, 0.4)"
                        boxShadow="0 4px 20px rgba(16, 185, 129, 0.3), 0 0 20px rgba(16, 185, 129, 0.1)"
                        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
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
                        _hover={{
                            bg: "linear-gradient(135deg, #34d399, #10b981)",
                            transform: "translateY(-3px) scale(1.02)",
                            boxShadow: "0 8px 30px rgba(16, 185, 129, 0.5), 0 0 40px rgba(16, 185, 129, 0.2)",
                            borderColor: "rgba(52, 211, 153, 0.6)",
                        }}
                        _active={{
                            transform: "translateY(-1px) scale(1)",
                            boxShadow: "0 4px 15px rgba(16, 185, 129, 0.4)",
                        }}
                        _loading={{
                            opacity: 0.8,
                        }}
                        role="group"
                    >
                        Run Module
                    </Button>
                </div>
                <div className="button">
                    <OutputSelector outputType={outputType} onSelectOutputType={onSelectOutputType} isDisabledOutputType={isDisabledOutputType} />
                </div>
            </div>
        </div>
          <Box
            borderRadius="16px"
            overflow="hidden"
            border="2px solid"
            borderColor="rgba(255, 152, 0, 0.3)"
            boxShadow="0 4px 20px rgba(255, 152, 0, 0.15), 0 0 40px rgba(255, 152, 0, 0.05)"
          >
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
          </Box>
    </div>
  );
};
export default QagentAiOutput;
