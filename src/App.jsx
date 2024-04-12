import { Box } from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor";



{/* <div>
      <image src="/public/qagentos.png"/>
      </div> */}

function App() {
  return (
  
    <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
        <img src="/qagentos.png" alt="Description of the image" style={{ 
          height: '60px', width: 'auto' }} />
      <CodeEditor />
    </Box>
  );
}

export default App;
