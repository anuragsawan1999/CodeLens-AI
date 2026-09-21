import {useEffect,useState} from "react";
import API from "../api";


export default function Profile(){


const [user,setUser]=useState(null);



const getProfile=async()=>{


try{


const res=await API.get(

"/auth/profile",

{

headers:{

Authorization:
`Bearer ${localStorage.getItem("token")}`

}

}

);


setUser(res.data.user);



}
catch(err){

console.log(err);

}


}



useEffect(()=>{

getProfile();

},[]);




if(!user){

return <h2>Loading...</h2>

}



return(


<div>


<h1>👤 Profile</h1>



<div

style={{

background:"#161b22",
padding:"25px",
borderRadius:"12px",
width:"350px"

}}

>


<h2>

{user.name}

</h2>



<p>

📧 {user.email}

</p>



<p>

Joined:

{new Date(user.createdAt)
.toLocaleDateString()}

</p>



</div>



</div>


)

}