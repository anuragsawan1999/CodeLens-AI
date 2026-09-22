import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";


export default function Dashboard(){

  const [history,setHistory] = useState([]);

  const navigate = useNavigate();



  const loadHistory = async()=>{

    try{

      const token = localStorage.getItem("token");


      const res = await API.get(
        "/history",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );


      setHistory(res.data);


    }catch(err){

      console.log(
        "DASHBOARD ERROR:",
        err.response?.data || err.message
      );

    }

  };



  useEffect(()=>{

    loadHistory();

  },[]);



  return (

    <div style={{
      padding:"30px",
      background:"#0d1117",
      minHeight:"100vh",
      color:"white"
    }}>


      <h1>
        CodeLens AI Dashboard 🚀
      </h1>



      <div className="dashboard-stats">


        <div style={{
          background:"#161b22",
          padding:"20px",
          borderRadius:"10px",
          width:"100%",
          maxWidth:"250px"
        }}>


          <h2>
            Total Analysis
          </h2>


          <h1>
            {history.length}
          </h1>


        </div>



        <button

          onClick={()=>navigate("/analyze")}

          style={{

            padding:"15px 25px",

            height:"60px",

            marginTop:"40px",

            cursor:"pointer"

          }}

        >

          Analyze New Code 🚀

        </button>


      </div>




      <h2 style={{
        marginTop:"40px"
      }}>

        Recent Analysis

      </h2>




      {
        history.slice(0,5).map((item)=>(


          <div

          key={item._id}

          style={{

            background:"#161b22",

            padding:"15px",

            marginTop:"15px",

            borderRadius:"10px"

          }}

          >

            <h3>
              Code
            </h3>


            <pre>
              {item.code}
            </pre>



            <small>

            {new Date(item.createdAt).toLocaleString()}

            </small>


          </div>


        ))
      }



    </div>

  );

}