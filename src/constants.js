export const LANGUAGE_VERSIONS = {
  python: "3.10.0",
  javascript: "18.15.0",
  // typescript: "5.0.3",
  java: "15.0.2",
  // csharp: "6.12.0",
  php: "8.2.3",
};

export const MODULES = {
  "Unit Tests Retrieval": "search for tests of similar function",
  "Generate Unit Tests": "generate unit tests for branch coverage",
  // "Fix Bugs": "find bugs and fix them",
  // "Find Vulnerabilities": "detect vulnerable lines",
  "QAgent.AI": "AI based testing and bug fixing",
};

export const CODE_SNIPPETS = {
  javascript: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
  typescript: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Alex" });\n`,
  python: `# Example\ndef add(x: int, y: int)->int:\n\treturn x + y\n\n`,
  java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
  csharp:
    'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n',
  php: "<?php\n\n$name = 'Alex';\necho $name;\n",
};

export const DESCRIPTION = "This function adds two numbers together."

export const AIOUTPUTS = {
  "Test Generation": "search for tests of similar function",
  "Bug Fix": "AI based testing and bug fixing",
};

export const RETREIVALOUTPUT = {
  "Code Test Pair 1": "Retreived code test pair",
  "Code Test Pair 2": "Retreived code test pair",
  "Code Test Pair 3": "Retreived code test pair",
};

export const CLASSICALOUTPUTS = {
  "Unit Tests": "Generated Unit Tests",
  "Coverage Report": "Coverage Percentage of Unit Tests",
};
