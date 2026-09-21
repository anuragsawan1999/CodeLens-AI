import { useState } from "react";
import Editor from "@monaco-editor/react";
import API from "../api";

export default function Analyze() {

  const [code, setCode] = useState(`function hello() {
  console.log("Hello World");
}`);

  const [result, setResult] = useState("");


  const analyze = async () => {

    try {

      const token = localStorage.getItem("token");

      console.log("TOKEN:", token);


      const res = await API.post(
        "/ai/analyze",
        {
          code
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );


      console.log("AI RESPONSE:", res.data);


      setResult(res.data.analysis);


    } catch (err) {


      console.log(
        "AI ERROR:",
        err.response?.data || err.message
      );


      setResult("Error analyzing code");


    }

  };


  return (

    <div style={{display:"flex", gap:"20px"}}>


      <div style={{flex:1}}>

        <h2>Code Editor</h2>


        <Editor

          height="500px"

          defaultLanguage="javascript"

          value={code}

          theme="vs-dark"

          onChange={(value)=>setCode(value)}

        />


        <button
          onClick={analyze}
        >
          Analyze Code 🚀
        </button>


      </div>



      <div style={{flex:1}}>

        <h2>AI Analysis</h2>


        <pre
          style={{
            background:"#161b22",
            padding:"10px",
            height:"500px",
            overflow:"auto",
            color:"#fff"
          }}
        >

        {result}

        </pre>


      </div>


    </div>

  );

}