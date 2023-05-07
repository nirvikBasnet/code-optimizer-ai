import React, { useState } from "react";
import ReactAce from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';
import prettier from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';



import "../styles/CodeForm.css";


const CodeForm: React.FC =() => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const codeObject = { code };
    const jsonString = JSON.stringify(codeObject);

    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonString,
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices[0].message.content;
        //formating the code using javascript
        const formatted = prettier.format(content,{
            parser: 'babel',
            plugins: [parserBabel]
        });
        setOutput(formatted);
      } else {
        // Handle the error case
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  return (
<div className="flex justify-center items-center mx-auto my-20">
  <form className="form" onSubmit={handleSubmit}>
    <div className="flex">
      <div className="mr-4">
      <h2>Input:</h2>
        <ReactAce
          mode="javascript"
          theme="monokai"
          value={code}
          onChange={(newCode) => setCode(newCode)}
          className="w-2/3 h-40"
          placeholder="Enter your code here"
          editorProps={{ $blockScrolling: true }}
        />
      </div>
      <button
          className="h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
          type="submit"
        >
          Optimize
        </button>
      <div>
        
        <h2>Output:</h2>
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="p-4 border border-gray-300 rounded">
            <ReactAce
              mode="javascript"
              theme="monokai"
              value={output}
              className="w-2/3 h-40"
              placeholder="AI optimizing your code"
              editorProps={{ $blockScrolling: true }}
            />
          </div>
        )}
       
      </div>
    </div>
  </form>
</div>

  );
};

export default CodeForm;
