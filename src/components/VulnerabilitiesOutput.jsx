import { useState, useEffect } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";
import { Editor } from "@monaco-editor/react";
import "../styling/app.css";

import {  handleVulnerabilitiesModule } from "../handlers/modulehandlers";

const VulnerabilitiesOutput = ({ editorRef }) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [vulIndices,setVulIndices] = useState([]);
  const [vulLevels,setVulLevels] = useState([]);
  const [isError, setIsError] = useState(false);
  const runModuleVul = async () => {
    //set the output to null
    setOutput(null);
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
      await handleVulnerabilitiesModule(sourceCode, setIsError,setOutput, setVulIndices,setVulLevels, toast);
      
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
//   useEffect(() => {
//     runModuleVul();
//   }, []);

  return (  
    <div>
        <div className="buttons">
            <div className="labelButtonWrapper">
                <div className="label">
                    <Text 
                        mb={1}
                        fontSize="sm" 
                        fontWeight="700"
                        bgGradient="linear(135deg, #ef4444, #dc2626)"
                        bgClip="text"
                        letterSpacing="wide"
                        textTransform="uppercase"
                        style={{
                            textShadow: '0 0 20px rgba(239, 68, 68, 0.3)'
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
                        onClick={runModuleVul}
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
            height="75vh"
            p={4}
            color={isError ? "red.400" : "gray.300"}
            border="1px solid"
            borderRadius="20px"
            borderColor={isError ? "rgba(239, 68, 68, 0.5)" : "rgba(239, 68, 68, 0.3)"}
            boxShadow={isError ? "0 8px 32px rgba(239, 68, 68, 0.3)" : "0 8px 32px rgba(239, 68, 68, 0.2), 0 0 60px rgba(239, 68, 68, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.08)"}
            bg="rgba(10, 10, 30, 0.4)"
            backdropFilter="blur(16px)"
            overflow="auto"
            transition="all 0.3s ease"
            _hover={{
              borderColor: isError ? "rgba(239, 68, 68, 0.6)" : "rgba(239, 68, 68, 0.5)",
              boxShadow: isError ? "0 12px 48px rgba(239, 68, 68, 0.4)" : "0 12px 48px rgba(239, 68, 68, 0.3), 0 0 80px rgba(239, 68, 68, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.12)"
            }}
        >
            {output
            ? output.map((line, i) =>
                <div style={{display:"flex"}}>
                <p style={{flex:0.04}}>{i+1}&nbsp;</p>
                <Text key={i} style={{flex: 1, whiteSpace: "pre-wrap", backgroundColor: vulIndices.includes(i) ?( vulLevels[vulIndices.indexOf(i)]===1?'#EF5350':'#EF5350' ): 'transparent' , color: vulIndices.includes(i) && 'white'}}>
                    {line}
                </Text>
                </div>
                )
            : 'Click "Run Module" to see the output here'}
        </Box>
      </div>
  );
};
export default VulnerabilitiesOutput;
