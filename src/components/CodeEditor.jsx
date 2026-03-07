import { useRef, useState } from "react";
import { Box, HStack, Text, Textarea, Input,Slider, SliderTrack,SliderFilledTrack,Tooltip,SliderThumb } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import ModuleSelector from "./ModuleSelector";
import { CODE_SNIPPETS,DESCRIPTION } from "../constants.js";
import "../styling/app.css"
import Output from "./Output";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("python");
  const[module, setModule] = useState("Unit Tests Retrieval");
  const [description, setDescription] = useState(DESCRIPTION);
  const [isDisabledLanguage, setIsDisabledLanguage] = useState(false);
  // for Fix Bugs module
  const [functionName, setFunctionName] = useState("");
  const [testCasesInputs, settestCasesIntputs] = useState("");
  const [testCasesOutputs, settestCasesOutputs] = useState("");
  //for DB module
  const [sliderValue, setSliderValue] = useState(80)
  const [showTooltip, setShowTooltip] = useState(false)
  const [slider2Value, setSlider2Value] = useState(80)
  const [show2Tooltip, setShow2Tooltip] = useState(false)
  



  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const onSelectModule = (module) => {
    setModule(module);
    // setValue(CODE_SNIPPETS[module]);
    if ( module=== "Unit Tests Retrieval") {
      setIsDisabledLanguage(false);
    }
    else{
      setIsDisabledLanguage(true);
      setLanguage("python");
      // setValue(CODE_SNIPPETS["python"]);
    }
  }

  
  return (
    <Box>
      <HStack spacing={6} align="stretch">
        <Box w="50%">
          <div className="buttons">
            <div className="labelButtonWrapper">
              <div className="label">
                <Text 
                  mb={1}
                  fontSize="sm" 
                  fontWeight="700"
                  bgGradient="linear(to-r, #00aaaa, #00ffff)"
                  bgClip="text"
                  letterSpacing="wide"
                  textTransform="uppercase"
                >
                  Task
                </Text>
              </div>
              <div className="button">
                <ModuleSelector module={module} onSelectModule={onSelectModule} />
              </div>
            </div>
            {module === "Unit Tests Retrieval" && 
              <div className="sliderLabelWraper">
              <div className="label">
                <Text 
                  mb={1}
                  ml={5} 
                  fontSize="xs" 
                  fontWeight="700"
                  bgGradient="linear(to-r, #00aaaa, #00ffff)"
                  bgClip="text"
                  letterSpacing="wide"
                  textTransform="uppercase"
                >
                  Same Language
                </Text>
              </div>
                <div className="slide">
                <Slider
                    id='slider'
                    mt={3}
                    defaultValue={80}
                    min={0}
                    max={100}
                    onChange={(v) => setSliderValue(v)}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    <SliderTrack height="8px" borderRadius="full" bg="rgba(255, 255, 255, 0.08)">
                      <SliderFilledTrack 
                        bgGradient="linear(to-r, #009999, #00cccc, #00ffff)" 
                        boxShadow="0 0 15px rgba(0, 204, 204, 0.6)"
                      />
                    </SliderTrack>
                    <Tooltip
                      hasArrow
                      bg="linear-gradient(135deg, #009999, #00cccc)"
                      color='white'
                      fontWeight="bold"
                      borderRadius="lg"
                      placement='top'
                      isOpen={showTooltip}
                      label={`${sliderValue}%`}
                    >
                      <SliderThumb 
                        boxSize={7}
                        bg="white"
                        border="3px solid"
                        borderColor="#00cccc"
                        boxShadow="0 0 0 4px rgba(0, 204, 204, 0.3), 0 4px 12px rgba(0, 0, 0, 0.4)"
                        _hover={{
                          boxSize: 8,
                          boxShadow: "0 0 0 6px rgba(0, 204, 204, 0.4), 0 6px 16px rgba(0, 0, 0, 0.5)"
                        }}
                        transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                      />
                    </Tooltip>
                  </Slider>
                </div>
                </div>}
                {module === "Unit Tests Retrieval" && 
              <div className="sliderLabelWraper" style={{marginRight: "40px"}}>
              <div className="label">
                <Text 
                  mb={1}
                  ml={5} 
                  fontSize="xs" 
                  fontWeight="700"
                  bgGradient="linear(to-r, #00aaaa, #00ffff)"
                  bgClip="text"
                  letterSpacing="wide"
                  textTransform="uppercase"
                >
                  Different Language
                </Text>
              </div>
                <div className="slide">
                <Slider
                    id='slider'
                    mt={3}
                    mr={1}
                    defaultValue={80}
                    min={0}
                    max={100}
                    onChange={(v) => setSlider2Value(v)}
                    onMouseEnter={() => setShow2Tooltip(true)}
                    onMouseLeave={() => setShow2Tooltip(false)}
                  >
                    <SliderTrack height="8px" borderRadius="full" bg="rgba(255, 255, 255, 0.08)">
                      <SliderFilledTrack 
                        bgGradient="linear(to-r, #009999, #00cccc, #00ffff)" 
                        boxShadow="0 0 15px rgba(0, 204, 204, 0.6)"
                      />
                    </SliderTrack>
                    <Tooltip
                      hasArrow
                      bg="linear-gradient(135deg, #009999, #00cccc)"
                      color='white'
                      fontWeight="bold"
                      borderRadius="lg"
                      placement='top'
                      isOpen={show2Tooltip}
                      label={`${slider2Value}%`}
                    >
                      <SliderThumb 
                        boxSize={7}
                        bg="white"
                        border="3px solid"
                        borderColor="#00cccc"
                        boxShadow="0 0 0 4px rgba(0, 204, 204, 0.3), 0 4px 12px rgba(0, 0, 0, 0.4)"
                        _hover={{
                          boxSize: 8,
                          boxShadow: "0 0 0 6px rgba(0, 204, 204, 0.4), 0 6px 16px rgba(0, 0, 0, 0.5)"
                        }}
                        transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                      />
                    </Tooltip>
                  </Slider>
                </div>
                </div>
                
            }
            <div className="labelButtonWrapper">
              <div className="label">
                <Text 
                  mb={1}
                  fontSize="sm" 
                  fontWeight="700"
                  bgGradient="linear(to-r, #00aaaa, #00ffff)"
                  bgClip="text"
                  letterSpacing="wide"
                  textTransform="uppercase"
                >
                  Language
                </Text>
              </div>
              <div className="button">
                <LanguageSelector language={language} onSelect={onSelect} isDisabledLanguage={isDisabledLanguage} />
              </div>
            </div>
          </div>
          <Box
            borderRadius="20px"
            overflow="hidden"
            border="1px solid"
            borderColor="rgba(0, 204, 204, 0.25)"
            boxShadow="0 8px 32px rgba(0, 153, 153, 0.2), 0 0 60px rgba(0, 153, 153, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.08)"
            bg="rgba(10, 10, 30, 0.4)"
            backdropFilter="blur(16px)"
            transition="all 0.3s ease"
            _hover={{
              borderColor: "rgba(0, 204, 204, 0.4)",
              boxShadow: "0 12px 48px rgba(0, 153, 153, 0.3), 0 0 80px rgba(0, 153, 153, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.12)"
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
              height={module === "QAgent.AI" || module==="Fix Bugs" ? "40vh" : "75vh"}
              theme="vs-dark"
              language={language}
              defaultValue={CODE_SNIPPETS[language]}
              onMount={onMount}
              value={value}
              onChange={(value) => setValue(value)}
            />
          </Box>
          {module === "QAgent.AI" && 
          <div>
          <div className="label">
                <Text 
                  mb={2} 
                  mt={3} 
                  fontSize="sm"
                  fontWeight="700"
                  bgGradient="linear(to-r, #00aaaa, #00ffff)"
                  bgClip="text"
                  letterSpacing="wide"
                  textTransform="uppercase"
                >
                  📝 Code Description
                </Text>
          </div>
          <Box
            borderRadius="20px"
            overflow="hidden"
            border="1px solid"
            borderColor="rgba(0, 204, 204, 0.25)"
            boxShadow="0 8px 32px rgba(0, 153, 153, 0.2), 0 0 60px rgba(0, 153, 153, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.08)"
            bg="rgba(10, 10, 30, 0.4)"
            backdropFilter="blur(16px)"
            transition="all 0.3s ease"
            _hover={{
              borderColor: "rgba(0, 204, 204, 0.4)",
              boxShadow: "0 12px 48px rgba(0, 153, 153, 0.3), 0 0 80px rgba(0, 153, 153, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.12)"
            }}
          >
            <Textarea
              height="30.3vh"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Enter description for your code..."
              border="none"
              fontSize="14px"
              fontFamily='"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
              p={4}
              _focus={{ border: "none", boxShadow: "none" }}
              _placeholder={{ color: "gray.500" }}
            />
          </Box>
          </div>}
          {module === "Fix Bugs" && 
          <div>
          <div className="label">
                <Text 
                  mb={2} 
                  mt={3} 
                  fontSize="sm"
                  fontWeight="700"
                  bgGradient="linear(to-r, #00aaaa, #00ffff)"
                  bgClip="text"
                  letterSpacing="wide"
                  textTransform="uppercase"
                >
                  🔧 Function Name
                </Text>
          </div>
          <Box
            borderRadius="16px"
            overflow="hidden"
            border="1px solid"
            borderColor="rgba(0, 204, 204, 0.25)"
            boxShadow="0 6px 24px rgba(0, 153, 153, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.08)"
            bg="rgba(10, 10, 30, 0.4)"
            backdropFilter="blur(16px)"
            mb={3}
            transition="all 0.3s ease"
            _hover={{
              borderColor: "rgba(0, 204, 204, 0.4)"
            }}
          >
            <Input
              height="4.3vh"
              placeholder="Enter function name..."
              value={functionName}
              onChange={(event) => setFunctionName(event.target.value)}
              border="none"
              fontSize="14px"
              fontFamily='"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
              _focus={{ border: "none", boxShadow: "none" }}
              _placeholder={{ color: "gray.500" }}
            />
          </Box>
          <div style={{display:"flex", gap: "12px"}}>
            <div style={{flex: 1}}>
              <div className="label">
                <Text 
                  mb={2}
                  fontSize="sm"
                  fontWeight="700"
                  bgGradient="linear(to-r, #00aaaa, #00ffff)"
                  bgClip="text"
                  letterSpacing="wide"
                  textTransform="uppercase"
                >
                  📥 Test Case Inputs
                </Text>
              </div>
              <Box
                borderRadius="16px"
                overflow="hidden"
                border="1px solid"
                borderColor="rgba(0, 204, 204, 0.25)"
                boxShadow="0 6px 24px rgba(0, 153, 153, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.08)"
                bg="rgba(10, 10, 30, 0.4)"
                backdropFilter="blur(16px)"
                transition="all 0.3s ease"
                _hover={{
                  borderColor: "rgba(0, 204, 204, 0.4)"
                }}
              >
                <Textarea
                  height="20.6vh"
                  value={testCasesInputs}
                  onChange={(event) => settestCasesIntputs(event.target.value)}
                  placeholder="{argument value 1 for test case1}
{argument value 2 for testcase 1}
{other arguments values for test case1}
===delimiter is new empty line===
{argument value 1 of testcase 2}
..."
                  border="none"
                  fontSize="13px"
                  fontFamily='Consolas, monospace'
                  p={3}
                  _focus={{ border: "none", boxShadow: "none" }}
                  _placeholder={{ color: "gray.500", fontSize: "12px" }}
                />
              </Box>
            </div>
            <div style={{flex: 1}}>
              <div className="label">
                <Text 
                  mb={2}
                  fontSize="sm"
                  fontWeight="700"
                  bgGradient="linear(to-r, #00aaaa, #00ffff)"
                  bgClip="text"
                  letterSpacing="wide"
                  textTransform="uppercase"
                >
                  📤 Test Case Outputs
                </Text>
              </div>
              <Box
                borderRadius="16px"
                overflow="hidden"
                border="1px solid"
                borderColor="rgba(0, 204, 204, 0.25)"
                boxShadow="0 6px 24px rgba(0, 153, 153, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.08)"
                bg="rgba(10, 10, 30, 0.4)"
                backdropFilter="blur(16px)"
                transition="all 0.3s ease"
                _hover={{
                  borderColor: "rgba(0, 204, 204, 0.4)"
                }}
              >
                <Textarea
                  height="20.6vh"
                  value={testCasesOutputs}
                  onChange={(event) => settestCasesOutputs(event.target.value)}
                  placeholder="{return value 1 for test case1}
{return value 2 for testcase 1}
{other arguments values for test case1}
===delimiter is new empty line===
{return value 1 of testcase 2}
..."
                  border="none"
                  fontSize="13px"
                  fontFamily='Consolas, monospace'
                  p={3}
                  _focus={{ border: "none", boxShadow: "none" }}
                  _placeholder={{ color: "gray.500", fontSize: "12px" }}
                />
              </Box>
            </div>
          </div>
          </div>}
        </Box>
        <Output 
          editorRef={editorRef} 
          description={description} 
          language={language} 
          module={module} 
          functionName={functionName} 
          testCasesInputs={testCasesInputs} 
          testCasesOutputs={testCasesOutputs} 
          sliderValue={sliderValue} 
          slider2Value={slider2Value} 
        />
      </HStack>
    </Box>
  );
};
export default CodeEditor;
