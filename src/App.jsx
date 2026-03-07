import { Box, Text, Container } from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor";
import "./styling/app.css";

function App() {
  return (
    <Box 
      minH="100vh" 
      bg="#0a0118" 
      color="gray.500" 
      position="relative"
      overflow="hidden"
    >
      {/* Animated background gradient orbs */}
      <Box className="gradient-orb gradient-orb-1" />
      <Box className="gradient-orb gradient-orb-2" />
      <Box className="gradient-orb gradient-orb-3" />
      
      {/* Grid pattern overlay */}
      <Box className="grid-background" />
      
      <Container maxW="container.2xl" px={8} py={10} position="relative" zIndex={1}>
        {/* Header Section */}
        <Box 
          display="flex" 
          alignItems="center" 
          justifyContent="space-between"
          mb={8}
          p={6}
          borderRadius="24px"
          bg="rgba(10, 10, 30, 0.6)"
          backdropFilter="blur(20px)"
          border="1px solid"
          borderColor="rgba(0, 204, 204, 0.15)"
          boxShadow="0 8px 32px rgba(0, 153, 153, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
          transition="all 0.3s ease"
          _hover={{
            borderColor: "rgba(0, 204, 204, 0.3)",
            boxShadow: "0 12px 48px rgba(0, 153, 153, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
          }}
        >
          <Box display="flex" alignItems="center">
            <Box 
              position="relative"
              _before={{
                content: '""',
                position: "absolute",
                inset: "-4px",
                borderRadius: "full",
                padding: "2px",
                background: "linear-gradient(135deg, #009999, #00ffff, #009999)",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                opacity: 0.6,
                animation: "rotate 4s linear infinite"
              }}
            >
              <img src="/qagentos.png" alt="QAgent AI" className="iconHome" />
            </Box>
            
            <Box display="flex" alignItems="baseline" ml={6}>
              <Text
                fontSize="6xl"
                fontWeight="900"
                bgGradient="linear(135deg, #009999, #00cccc, #00ffff, #00cccc)"
                bgClip="text"
                letterSpacing="tight"
                style={{
                  textShadow: '0 0 60px rgba(0, 204, 204, 0.5), 0 0 30px rgba(0, 153, 153, 0.3)',
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                }}
              >
                QA
              </Text>
              <Text
                fontSize="6xl"
                fontWeight="900"
                bgGradient="linear(135deg, #ffffff, #cccccc, #ffffff)"
                bgClip="text"
                letterSpacing="tight"
                ml={-1}
                style={{
                  textShadow: '0 0 30px rgba(255, 255, 255, 0.3)',
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                }}
              >
                gent
              </Text>
            </Box>
          </Box>
          
          <Box
            px={6}
            py={2.5}
            borderRadius="full"
            bg="linear-gradient(135deg, rgba(0, 153, 153, 0.2), rgba(0, 204, 204, 0.1))"
            border="1px solid"
            borderColor="rgba(0, 204, 204, 0.4)"
            backdropFilter="blur(12px)"
            boxShadow="0 4px 16px rgba(0, 153, 153, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
            position="relative"
            overflow="hidden"
            _before={{
              content: '""',
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
              animation: "shimmer 3s infinite"
            }}
          >
            <Text
              fontSize="md"
              fontWeight="700"
              color="gray.100"
              letterSpacing="wide"
              style={{
                textShadow: '0 0 20px rgba(0, 204, 204, 0.4)',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
              }}
            >
              ✨ Your Quality Assurance Ally!
            </Text>
          </Box>
        </Box>
        
        <CodeEditor />
      </Container>
    </Box>
  );
}

export default App;


// # install dependencies

// npm install

// # start the dev server

// npm run dev