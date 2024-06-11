
var apiprefix='http://20.70.138.137:80/'
var apiprefix='http://127.0.0.1:8080/'
var apiprefix='http://192.168.1.2:80/'

export async function handleClassicalModule(
  sourceCode,
  setIsError,
  setUnitTestOutput,
  toast,
  setModuleOutput,
  setIsDisabledOutputType,
) {
  const response = await fetch(apiprefix+"run-classical", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: sourceCode,

    }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  console.log(data);
  if (data.output[1] !== "") {
    setIsError(true);
    setUnitTestOutput(data.output[1]);
    console.log(data.output[1]);
    toast({
      title: "An error occurred.",
      description: "Unable to run module",
      status: "error",
      duration: 6000,
    });
  } else {
    setIsError(false);
    setUnitTestOutput(data.output[0]); //to show the unit tests when he finish
    setIsDisabledOutputType(false); //to enable the output type
    setModuleOutput(data.output); //to return the llm output
  }
}
export async function handleDBModule(
  sourceCode,
  setIsError,
  setSimilarCodeOutput,
  setUnitTestOutput,
  toast,
  setDbOutput,
  setIsDisabledOutputType,
  language,
  thresholSameLang,
  thresholDiffLang,
) {
  const response = await fetch(apiprefix+"query", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: sourceCode,
      language:language,
      thresholSameLang: thresholSameLang/100,
      thresholdDiffLang: thresholDiffLang/100,
    }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  console.log(data);
  if (data.codes.length == 0) {
    // setIsError(true);
    console.log("lol")
    setSimilarCodeOutput(["No Similar Data was found in the database"]);
    setUnitTestOutput(["An Error Occured in Retrieving Data"]);
    // console.log(data);
    // toast({
    //   title: "An error occurred.",
    //   description: "Unable to run module",
    //   status: "error",
    //   duration: 6000,
    // });
  } else {
    setIsError(false);
    setSimilarCodeOutput(data.codes[0]);
    var loopVar=Object.keys(data.tests[0]).length
    if (loopVar>3){
      
      loopVar=3
      }
      // for loop on it to get the tests
    let Tosend=""
    console.log("lolgamed")
    console.log(data.tests[0])
    for (let i = 0; i < loopVar; i++) {
    Tosend+=data.tests[0]["test "+i]
    }
    console.log("lolerxd")
    console.log(Tosend)
    setUnitTestOutput(
        // data.tests[0]["test 0"] +
        // "\n" +
        // data.tests[0]["test 1"] +
        // "\n" +
        // data.tests[0]["test 2"]
        Tosend
    );
    // loop on data and make it list of code test pairs
    // like so {code: "code", test: "test"}
    const dataPairs = data.codes.map((code, index) => {
      return { code: code, tests: data.tests[index] };
    });
    setDbOutput(dataPairs); //to return the llm output
    setIsDisabledOutputType(false); //to enable the output type
  }
}
export async function handleFixBugsModule(
  sourceCode,
  functionName,
  testCasesInputs,
  testCasesOutputs,
  setIsError,
  setUnitTestOutput,
  toast
) {
  const response = await fetch(apiprefix+"run-fixbugs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: sourceCode,
      function_name: functionName,
      test_cases_inputs: testCasesInputs,
      test_cases_outputs: testCasesOutputs,
    }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  console.log(data);
  if (data.output === "") {
    setIsError(true);
    setUnitTestOutput(data.output);
    console.log(data.output);
    toast({
      title: "An error occurred.",
      description: "Unable to run module",
      status: "error",
      duration: 6000,
    });
  } else {
    setIsError(false);
    setUnitTestOutput(data.output);
  }
}
export async function handleVulnerabilitiesModule(
  sourceCode,
  setIsError,
  setOutput,
  setVulIndices,
  setVulLevels,
  toast
) {
  console.log("sourceCode", sourceCode);
  const response = await fetch(apiprefix+"vuldetect", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: sourceCode,
    }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  console.log(data);
  if (data.length == 0) {
    setIsError(false);
    setOutput(["No vulnerabilities detected !"]);
    console.log(data);
  } else {
    setIsError(false);
    const vuls_indices = [];
    const vul_levels = [];
    for (let i = 0; i < data.length; i++) {
      vuls_indices.push(data[i]["line_number"]);
      vul_levels.push(data[i]["vul_level"]);
    }
    setVulIndices(vuls_indices);
    setVulLevels(vul_levels);
    console.log(vuls_indices);
    console.log(vul_levels);
    setOutput(sourceCode.split("\n"));
  }
}
export async function handleQAgentAIModule(
  sourceCode,
  description,
  setIsError,
  setUnitTestOutput,
  toast,
  setLlmOutput,
  setIsDisabledOutputType
) {
  // setLlmOutput("yes");
  // setUnitTestOutput("ana i show el unit tests")
  // setIsDisabledOutputType(false);
  const response = await fetch(apiprefix+"qagentai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: sourceCode,
      description: description,
    }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  console.log(data);
  if (data.output[0] === "") {
    setIsError(true);
    setOutput(data.output[0].trim().split("\n"));
    console.log(data.output[0].trim().split("\n"));
    toast({
      title: "An error occurred.",
      description: "Unable to run module",
      status: "error",
      duration: 6000,
    });
  } else {
    setIsError(false);
    //TODO: you must set here the unit tests
    console.log(data.output[0]);
    setUnitTestOutput(data.output[0]); //to show the unit tests when he finish
    setIsDisabledOutputType(false); //to enable the output type
    setLlmOutput(data.output); //to return the llm output
  }
}
