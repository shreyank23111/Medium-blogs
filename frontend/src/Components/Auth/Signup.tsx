import { SignupInput } from "@shreyank23/medium-common";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../../config";
import { LabelledInput } from "./LabelledInputs";
import { Heading } from "./Heading";
import { useSetRecoilState } from "recoil";
import { authState } from "../../Store/authState";

export const Signup = () => {
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authState);
  const [userInputs, setUserInputs] = useState<SignupInput>({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  })

  async function sendRequest(){
    try{
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, userInputs, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      localStorage.setItem("token", response.data.token);
      setAuth(true)
      navigate("/blogs");
    } catch(err) {
      alert("Unable to signup");
      console.log("Signup Error: ", err);
      
    }
  } 

  return <div className="h-screen flex justify-center flex-col">
  <div className="flex justify-center">
    <div>

       {/* <div className="px-10">
           <div className="text-3xl font-extrabold">
               Create an account
           </div>
           <div className="text-slate-500">
           </div>
       </div> */}

       <Heading type={"signup"}/>
       
           <LabelledInput label="FirstName" placeholder="Shreyank" onChange={(e) => {
               setUserInputs({
                   ...userInputs,
                   firstName: e.target.value
               })
           }} />

           <LabelledInput label="LastName" placeholder="Desai" onChange={(e) => {
               setUserInputs({
                   ...userInputs,
                   lastName: e.target.value
               })
           }} />
     
           <LabelledInput label="Username" placeholder="shreyank@gmail.com" onChange={(e) => {
               setUserInputs({
                   ...userInputs,
                   email: e.target.value
               })
           }} />

           <LabelledInput label="Password" type={"password"} placeholder="min 6 characters" onChange={(e) => {
               setUserInputs({
                   ...userInputs,
                   password: e.target.value
               })
           }} />

           <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"> Signup </button>
       </div>
   </div>
</div>
}