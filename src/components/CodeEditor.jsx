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
                <Text mb={2} mt={2} fontSize="lg">
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
                <Text mb={2} mt={2} mr={2} fontSize="lg">
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
                    colorScheme='teal'
                    onChange={(v) => setSliderValue(v)}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <Tooltip
                      hasArrow
                      bg='teal.500'
                      color='white'
                      placement='top'
                      isOpen={showTooltip}
                      label={`${sliderValue}%`}
                    >
                      <SliderThumb />
                    </Tooltip>
                  </Slider>
                </div>
                </div>}
                {module === "Unit Tests Retrieval" && 
              <div className="sliderLabelWraper">
              <div className="label">
                <Text mb={2} mt={2} mr={2} fontSize="lg">
                  Different Lang 
                </Text>
              </div>
                <div className="slide">
                <Slider
                    id='slider'
                    mt={4}
                    defaultValue={80}
                    min={0}
                    max={100}
                    colorScheme='teal'
                    onChange={(v) => setSlider2Value(v)}
                    onMouseEnter={() => setShow2Tooltip(true)}
                    onMouseLeave={() => setShow2Tooltip(false)}
                  >
                    
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <Tooltip
                      hasArrow
                      bg='teal.500'
                      color='white'
                      placement='top'
                      isOpen={show2Tooltip}
                      label={`${slider2Value}%`}
                    >
                      <SliderThumb />
                    </Tooltip>
                  </Slider>
                </div>
                </div>
                
            }
            <div className="labelButtonWrapper">
              <div className="label">
                <Text mb={2} mt={2} fontSize="lg">
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
