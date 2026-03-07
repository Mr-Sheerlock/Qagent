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
                <Text mb={2} mt={2} fontSize="sm" fontWeight="600" color="gray.300">
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
                <Text mb={2} mt={2} mr={2} fontSize="sm" fontWeight="600" color="gray.300">
                  Same Lang
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
                    <SliderTrack 
                      bg="rgba(255, 255, 255, 0.1)" 
                      h="6px" 
                      borderRadius="full"
                    >
                      <SliderFilledTrack 
                        bgGradient="linear(to-r, #009999, #00cccc)" 
                        boxShadow="0 0 15px rgba(0, 153, 153, 0.6)"
                      />
                    </SliderTrack>
                    <Tooltip
                      hasArrow
                      bg="linear-gradient(135deg, #009999, #00cccc)"
                      color="white"
                      placement="top"
                      isOpen={showTooltip}
                      label={`${sliderValue}%`}
                      borderRadius="8px"
                      px={3}
                      py={2}
                      fontWeight="700"
                      fontSize="sm"
                      boxShadow="0 4px 12px rgba(0, 153, 153, 0.4)"
                    >
                      <SliderThumb 
                        boxSize={6} 
                        bg="white"
                        border="3px solid"
                        borderColor="#009999"
                        boxShadow="0 0 0 4px rgba(0, 153, 153, 0.2), 0 4px 12px rgba(0, 153, 153, 0.5)"
                        _hover={{
                          boxSize: 7,
                          boxShadow: "0 0 0 6px rgba(0, 153, 153, 0.3), 0 6px 20px rgba(0, 153, 153, 0.7)",
                        }}
                        transition="all 0.2s ease"
                      />
                    </Tooltip>
                  </Slider>
                </div>
                </div>}
                {module === "Unit Tests Retrieval" && 
              <div className="sliderLabelWraper">
              <div className="label">
                <Text mb={2} mt={2} mr={2} fontSize="sm" fontWeight="600" color="gray.300">
                  Different Lang 
                </Text>
              </div>
                <div className="slide">
                <Slider
                    id='slider2'
                    mt={4}
                    defaultValue={80}
                    min={0}
                    max={100}
                    onChange={(v) => setSlider2Value(v)}
                    onMouseEnter={() => setShow2Tooltip(true)}
                    onMouseLeave={() => setShow2Tooltip(false)}
                  >
                    <SliderTrack 
                      bg="rgba(255, 255, 255, 0.1)" 
                      h="6px" 
                      borderRadius="full"
                    >
                      <SliderFilledTrack 
                        bgGradient="linear(to-r, #009999, #00cccc)" 
                        boxShadow="0 0 15px rgba(0, 153, 153, 0.6)"
                      />
                    </SliderTrack>
                    <Tooltip
                      hasArrow
                      bg="linear-gradient(135deg, #009999, #00cccc)"
                      color="white"
                      placement="top"
                      isOpen={show2Tooltip}
                      label={`${slider2Value}%`}
                      borderRadius="8px"
                      px={3}
                      py={2}
                      fontWeight="700"
                      fontSize="sm"
                      boxShadow="0 4px 12px rgba(0, 153, 153, 0.4)"
                    >
                      <SliderThumb 
                        boxSize={6} 
                        bg="white"
                        border="3px solid"
                        borderColor="#009999"
                        boxShadow="0 0 0 4px rgba(0, 153, 153, 0.2), 0 4px 12px rgba(0, 153, 153, 0.5)"
                        _hover={{
                          boxSize: 7,
                          boxShadow: "0 0 0 6px rgba(0, 153, 153, 0.3), 0 6px 20px rgba(0, 153, 153, 0.7)",
                        }}
                        transition="all 0.2s ease"
                      />
                    </Tooltip>
                  </Slider>
                </div>
                </div>
                
            }
            <div className="labelButtonWrapper">
              <div className="label">
                <Text mb={2} mt={2} fontSize="sm" fontWeight="600" color="gray.300">
                  Language
                </Text>
              </div>
              <div className="button">
                <LanguageSelector language={language} onSelect={onSelect} isDisabledLanguage={isDisabledLanguage} />
              </div>
            </div>
          </div>
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
          {module === "QAgent.AI" && 
          <div>
          <div className="label">
                <Text mb={1} mt={1} fontSize="lg">
                  Enter Description for your code here :
                </Text>
          </div>
          <Textarea
            height="30.3vh"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Enter description"
          />
          </div>}
          {module === "Fix Bugs" && 
          <div>
          <div className="label">
                <Text mb={1} mt={1} fontSize="lg">
                  Function Name :
                </Text>
          </div>
          <Input
            height="4.3vh"
            mb={1}
            placeholder="Enter function name"
            value={functionName}
            onChange={(event) => setFunctionName(event.target.value)}
          />
          <div style={{display:"flex"}}>
            <div style={{flex: 1}}>
              <div className="label">
                <Text mb={1} mt={1} fontSize="lg">
                  Test Cases Inputs :
                </Text>
              </div>
              <Textarea
                height="20.6vh"
                mr={1}
                value={testCasesInputs}
                onChange={(event) => settestCasesIntputs(event.target.value)}
                placeholder="{argument value 1 for test case1}
                {argument value 2 for testcase 1}
                {other arguments values for test case1}
                ===delimiter is new empty line===
                {argument value 1 of testcase 2}
                ..."
              />
            </div>
            <div style={{flex: 1}}>
              <div className="label">
                <Text mb={1} mt={1} fontSize="lg">
                  Test Cases Outputs :
                </Text>
              </div>
              <Textarea
                height="20.6vh"
                ml={1}
                value={testCasesOutputs}
                onChange={(event) => settestCasesOutputs(event.target.value)}
                placeholder="{return value 1 for test case1}
                {return value 2 for testcase 1}
                {other arguments values for test case1}
                ===delimiter is new empty line===
                {return value 1 of testcase 2}
                ..."
              />
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
