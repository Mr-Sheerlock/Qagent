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
                        onClick={runModuleVul}
                    >
                        Run Module
                    </Button>
                </div>
            </div>
        </div>
        <Box
            height="75vh"
            p={2}
            color={isError ? "red.400" : ""}
            border="1px solid"
            borderRadius={4}
            borderColor={isError ? "red.500" : "#333"}
            overflow="auto"
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
