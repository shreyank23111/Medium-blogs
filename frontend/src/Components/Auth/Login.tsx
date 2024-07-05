import { SigninInput } from "@shreyank23/medium-common";
import axios from "axios";
import { useState } from "react";
import { useNavigate,  } from "react-router-dom"
import { BACKEND_URL } from "../../config";
import { LabelledInput } from "./LabelledInputs";
import { Heading } from "./Heading";
// import { Signup } from "../../Pages/Signup";

export const Login = () => {
  const navigate = useNavigate();
  const [userInputs, setUserInputs] = useState<SigninInput>({
    email: "",
    password: ""
  })

  async function sendRequest(){
    try{
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/login`, userInputs, {
        headers: {
          'Content-Type': "application/json"
        }
      })
      localStorage.setItem("token", response.data.token);
      navigate("/blogs")
    } catch(err){
      alert("Error in Login");
      console.log("Login error", err);
    }
  }
  return <div className="h-screen flex justify-center flex-col">
     <div className="flex justify-center">
       <div>
          
          <Heading type={"signin"} />
        
              <LabelledInput label="Username" placeholder="harkirat@gmail.com" onChange={(e) => {
                  setUserInputs({
                      ...userInputs,
                      email: e.target.value
                  })
              }} />
              <LabelledInput label="Password" type={"password"} placeholder="123456" onChange={(e) => {
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