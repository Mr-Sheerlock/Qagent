export async function handleClassicalModule(sourceCode, setIsError, setUnitTestOutput, toast) {
    const response = await fetch('http://127.0.0.1:5000/run-classical', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: sourceCode
      })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    if (data.output[1]!=="") {
      setIsError(true);
      setUnitTestOutput(data.output[1].trim().split("\n"));
      console.log(data.output[1].trim().split("\n"));
      toast({
        title: "An error occurred.",
        description: "Unable to run module",
        status: "error",
        duration: 6000,
      });
    }
    else {
      setIsError(false);
      setUnitTestOutput(data.output[0].trim().split("\n"));
    }
  }
export async function handleDBModule(sourceCode, setIsError, setUnitTestOutput, toast) {
  const response = await fetch('http://127.0.0.1:8080/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: sourceCode
      })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    if (data.codes.length==0) {
      setIsError(true);
      setUnitTestOutput("An Error Occured in Retrieving Data");
      console.log(data);
      toast({
        title: "An error occurred.",
        description: "Unable to run module",
        status: "error",
        duration: 6000,
      });
    }
    else {
      setIsError(false);
      setUnitTestOutput(data.codes.join("\n") + "\n" + data.tests.join("\n"));
    }
}
export async function handleFixBugsModule(sourceCode, setIsError, setUnitTestOutput, toast) {
}
export async function handleVulnerabilitiesModule(sourceCode, setIsError, setUnitTestOutput, toast) {
}
export async function handleQAgentAIModule(sourceCode,description, setIsError, setUnitTestOutput, toast, setLlmOutput,setIsDisabledOutputType) {
  // setLlmOutput("yes");
  // setUnitTestOutput("ana i show el unit tests")
  // setIsDisabledOutputType(false);
  const response = await fetch('http://127.0.0.1:8080/run-qagentai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: sourceCode,
        description: description
      })
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
    }
    else {
      setIsError(false);
      //TODO: you must set here the unit tests
      console.log(data.output[0])
      setUnitTestOutput(data.output[0])//to show the unit tests when he finish
      setLlmOutput(data.output);//to return the llm output
      setIsDisabledOutputType(false);//to enable the output type
    }
}