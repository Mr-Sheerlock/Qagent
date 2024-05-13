export async function handleClassicalModule(sourceCode, setIsError, setOutput, toast) {
    const response = await fetch('http://127.0.0.1:5000/run-python', {
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
      setOutput(data.output[1].trim().split("\n"));
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
      setOutput(data.output[0].trim().split("\n"));
    }
  }
export async function handleDBModule(sourceCode, setIsError, setOutput, toast) {
}
export async function handleFixBugsModule(sourceCode, setIsError, setOutput, toast) {
}
export async function handleVulnerabilitiesModule(sourceCode, setIsError, setOutput, toast) {
}
export async function handleQAgentAIModule(sourceCode, setIsError, setOutput, toast) {
}