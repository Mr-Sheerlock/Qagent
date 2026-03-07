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
      <HStack spacing={4}>
        <Box w="50%">
          <div className="buttons">
            <div className="labelButtonWrapper">
              <div className="label">
                <Text 
                  mb={2} 
                  mt={2} 
                  fontSize="md" 
                  fontWeight="700"
                  bgGradient="linear(to-r, #008888, #00aaaa)"
                  bgClip="text"
                  letterSpacing="wide"
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
                  mb={2} 
                  mt={2} 
                  ml={5} 
                  fontSize="sm" 
                  fontWeight="700"
                  bgGradient="linear(to-r, #008888, #00aaaa)"
                  bgClip="text"
                  letterSpacing="wide"
                >
                  Same Language
                </Text>
              </div>
                <div className="slide">
                <Slider
                    id='slider'
                    mt={4}
                    defaultValue={80}
                    min={0}
                    max={100}
                    onChange={(v) => setSliderValue(v)}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    <SliderTrack height="6px" borderRadius="full" bg="rgba(255, 255, 255, 0.1)">
                      <SliderFilledTrack 
                        bgGradient="linear(to-r, #009999, #00cccc)" 
                        boxShadow="0 0 10px rgba(0, 204, 204, 0.5)"
                      />
                    </SliderTrack>
                    <Tooltip
                      hasArrow
                      bgGradient="linear(to-r, #009999, #00cccc)"
                      color='white'
                      fontWeight="bold"
                      borderRadius="md"
                      placement='top'
                      isOpen={showTooltip}
                      label={`${sliderValue}%`}
                    >
                      <SliderThumb 
                        boxSize={6}
                        bg="white"
                        border="3px solid"
                        borderColor="#009999"
                        boxShadow="0 0 0 3px rgba(0, 153, 153, 0.2), 0 2px 8px rgba(0, 0, 0, 0.3)"
                        _hover={{
                          boxSize: 7,
                          boxShadow: "0 0 0 4px rgba(0, 153, 153, 0.3), 0 4px 12px rgba(0, 0, 0, 0.4)"
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
                  mb={2} 
                  mt={2} 
                  ml={5} 
                  fontSize="sm" 
                  fontWeight="700"
                  bgGradient="linear(to-r, #008888, #00aaaa)"
                  bgClip="text"
                  letterSpacing="wide"
                >
                  Different Language
                </Text>
              </div>
                <div className="slide">
                <Slider
                    id='slider'
                    mt={4}
                    mr={1}
                    defaultValue={80}
                    min={0}
                    max={100}
                    onChange={(v) => setSlider2Value(v)}
                    onMouseEnter={() => setShow2Tooltip(true)}
                    onMouseLeave={() => setShow2Tooltip(false)}
                  >
                    <SliderTrack height="6px" borderRadius="full" bg="rgba(255, 255, 255, 0.1)">
                      <SliderFilledTrack 
                        bgGradient="linear(to-r, #009999, #00cccc)" 
                        boxShadow="0 0 10px rgba(0, 204, 204, 0.5)"
                      />
                    </SliderTrack>
                    <Tooltip
                      hasArrow
                      bgGradient="linear(to-r, #009999, #00cccc)"
                      color='white'
                      fontWeight="bold"
                      borderRadius="md"
                      placement='top'
                      isOpen={show2Tooltip}
                      label={`${slider2Value}%`}
                    >
                      <SliderThumb 
                        boxSize={6}
                        bg="white"
                        border="3px solid"
                        borderColor="#009999"
                        boxShadow="0 0 0 3px rgba(0, 153, 153, 0.2), 0 2px 8px rgba(0, 0, 0, 0.3)"
                        _hover={{
                          boxSize: 7,
                          boxShadow: "0 0 0 4px rgba(0, 153, 153, 0.3), 0 4px 12px rgba(0, 0, 0, 0.4)"
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
                  mb={2} 
                  mt={2} 
                  fontSize="md" 
                  fontWeight="700"
                  bgGradient="linear(to-r, #008888, #00aaaa)"
                  bgClip="text"
                  letterSpacing="wide"
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
            borderRadius="16px"
            overflow="hidden"
            border="2px solid"
            borderColor="rgba(0, 153, 153, 0.3)"
            boxShadow="0 4px 20px rgba(0, 153, 153, 0.15), 0 0 40px rgba(0, 153, 153, 0.05)"
          >
            <Editor
              options={{
                minimap: {
                  enabled: false,
                },
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
                <Text mb={1} mt={1} fontSize="lg">
                  Enter Description for your code here :
                </Text>
          </div>
          <Box
            borderRadius="16px"
            overflow="hidden"
            border="2px solid"
            borderColor="rgba(0, 153, 153, 0.3)"
            boxShadow="0 4px 20px rgba(0, 153, 153, 0.15), 0 0 40px rgba(0, 153, 153, 0.05)"
          >
            <Textarea
              height="30.3vh"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Enter description"
              border="none"
              _focus={{ border: "none", boxShadow: "none" }}
            />
          </Box>
          </div>}
          {module === "Fix Bugs" && 
          <div>
          <div className="label">
                <Text mb={1} mt={1} fontSize="lg">
                  Function Name :
                </Text>
          </div>
          <Box
            borderRadius="12px"
            overflow="hidden"
            border="2px solid"
            borderColor="rgba(0, 153, 153, 0.3)"
            boxShadow="0 4px 20px rgba(0, 153, 153, 0.15), 0 0 40px rgba(0, 153, 153, 0.05)"
            mb={1}
          >
            <Input
              height="4.3vh"
              placeholder="Enter function name"
              value={functionName}
              onChange={(event) => setFunctionName(event.target.value)}
              border="none"
              _focus={{ border: "none", boxShadow: "none" }}
            />
          </Box>
          <div style={{display:"flex"}}>
            <div style={{flex: 1}}>
              <div className="label">
                <Text mb={1} mt={1} fontSize="lg">
                  Test Cases Inputs :
                </Text>
              </div>
              <Box
                borderRadius="12px"
                overflow="hidden"
                border="2px solid"
                borderColor="rgba(0, 153, 153, 0.3)"
                boxShadow="0 4px 20px rgba(0, 153, 153, 0.15), 0 0 40px rgba(0, 153, 153, 0.05)"
                mr={1}
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
                  _focus={{ border: "none", boxShadow: "none" }}
                />
              </Box>
            </div>
            <div style={{flex: 1}}>
              <div className="label">
                <Text mb={1} mt={1} fontSize="lg">
                  Test Cases Outputs :
                </Text>
              </div>
              <Box
                borderRadius="12px"
                overflow="hidden"
                border="2px solid"
                borderColor="rgba(0, 153, 153, 0.3)"
                boxShadow="0 4px 20px rgba(0, 153, 153, 0.15), 0 0 40px rgba(0, 153, 153, 0.05)"
                ml={1}
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
                  _focus={{ border: "none", boxShadow: "none" }}
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
