import { Box, Text } from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor";
import "./styling/app.css";

function App() {
  return (
  
    <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
      <Box display="flex" alignItems="center">
        <img src="/qagentos.png" alt="QAgent AI" className="iconHome" />
        <Box display="flex" alignItems="baseline" ml={4}>
          <Text
            fontSize="5xl"
            fontWeight="800"
            bgGradient="linear(to-r, #009999, #00cccc, #00ffff)"
            bgClip="text"
            letterSpacing="tight"
            style={{
              textShadow: '0 0 40px rgba(0, 204, 204, 0.4), 0 0 20px rgba(0, 153, 153, 0.3)'
            }}
          >
            QA
          </Text>
          <Text
            fontSize="5xl"
            fontWeight="800"
            bgGradient="linear(to-r, #ffffff, #e0e0e0)"
            bgClip="text"
            letterSpacing="tight"
            ml={-1}
            style={{
              textShadow: '0 0 20px rgba(255, 255, 255, 0.2)'
            }}
          >
            gent
          </Text>
        </Box>
        <Box
          ml={6}
          mt={2}
          px={4}
          py={1.5}
          borderRadius="full"
          bgGradient="linear(to-r, rgba(0, 153, 153, 0.15), rgba(0, 204, 204, 0.15))"
          border="1px solid"
          borderColor="rgba(0, 153, 153, 0.3)"
          backdropFilter="blur(8px)"
          boxShadow="0 4px 12px rgba(0, 153, 153, 0.1)"
        >
          <Text
            fontSize="sm"
            fontWeight="600"
            color="gray.300"
            letterSpacing="wide"
            style={{
              textShadow: '0 0 10px rgba(0, 153, 153, 0.3)'
            }}
          >
            Your Quality Assurance Ally!
          </Text>
        </Box>
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