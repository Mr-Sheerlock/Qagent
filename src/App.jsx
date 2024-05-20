import { Box, Text } from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor";
import "./styling/app.css";

function App() {
  return (
  
    <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
      <Box  display="flex">
        <img src="/qagentos.png" alt="Description of the image" className="iconHome" />
        <Text mt={2} ml={4} fontSize='3xl' style={{color:"#009999"}}>
        QA
        </Text>
        <Text mt={2}  fontSize='3xl' style={{color:"white"}}>
        gent
        </Text>
        <Text mt={7} ml={8}  fontSize='xs' >
        Your Quality Assurance Ally!
        </Text>
      </Box>
      
      <CodeEditor />
    </Box>
  );
}

export default App;


// # install dependencies

// npm install

// # start the dev server

// npm run dev