import { useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";
import "../styling/app.css";
import { handleClassicalModule, handleDBModule, handleFixBugsModule, handleVulnerabilitiesModule, handleQAgentAIModule } from "../handlers/modulehandlers";

const Output = ({ editorRef, language,module }) => {
  const toast = useToast();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runModule = async () => {
    //set the output to null
    setOutput(null);
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      //if i have multiple requests 
      if (module === "Generate Unit Tests") {
        await handleClassicalModule(sourceCode, setIsError, setOutput, toast);
      } else if (module === "Unit Tests Retrival") {
        await handleDBModule(sourceCode, setIsError, setOutput, toast);
      } else if (module === "Fix Bugs") {
        await handleFixBugsModule(sourceCode, setIsError, setOutput, toast);
      } else if (module === "Find Vulnerabilities") {
        await handleVulnerabilitiesModule(sourceCode, setIsError, setOutput, toast);
      } else if (module === "QAgent.AI") {
        await handleQAgentAIModule(sourceCode, setIsError, setOutput, toast);
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
        </div>
      </div>
      <Box
        height="75vh"
        p={2}
        color={isError ? "red.400" : ""}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
      >
        {output
          ? output.map((line, i) => <Text key={i} style={{whiteSpace: "pre-wrap"}}>{line}</Text>)
          : 'Click "Run Code" to see the output here'}
      </Box>
    </Box>
  );
};
export default Output;
