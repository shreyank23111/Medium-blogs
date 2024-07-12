import { SigninInput, signinInput } from "@shreyank23/medium-common";
import axios from "axios";
import { useState } from "react";
import { useNavigate,  } from "react-router-dom"
import { BACKEND_URL } from "../../config";
import { LabelledInput } from "./LabelledInputs";
import { useSetRecoilState } from "recoil";
import { authState } from "../../Store/authState";
import { Heading } from "./Heading";


interface ServerError {
  field: string;
  message: string;
}

export const Login = () => {
  const navigate = useNavigate();
  const setAuthState = useSetRecoilState(authState);
  const [error, setError] = useState<{[key: string]: string}>({})
  const [userInputs, setUserInputs] = useState<SigninInput>({
    email: "",
    password: ""
  })

  async function sendRequest(){ 
    const validate = signinInput.safeParse(userInputs);

    if(!validate.success){
      const zodErrors: { [key: string]: string} = {};
      validate.error.errors.forEach(err=> {
        zodErrors[err.path[0] as string] = err.message;
      })
      setError(zodErrors);
      return;
    }

    try{

      setError({});

      const response = await axios.post(`${BACKEND_URL}/api/v1/user/login`, userInputs, {
        headers: {
          'Content-Type': "application/json"
        }
      })

      const user = response.data.user

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(user));

      setAuthState({
        isAuthenticated: true,
        user: user
      })
      
      navigate("/blogs");
      setError({});

    } catch(err){
      if (axios.isAxiosError(err) && err.response) {
        const serverErrors = err.response.data.errors || [];
        const fieldErrors: { [key: string]: string } = {};
        if (serverErrors.length) {
          serverErrors.forEach((err: ServerError) => {
            fieldErrors[err.field] = err.message;
          });
        } else if (err.response.data.message) {
          fieldErrors.general = err.response.data.message;
        } else {
          fieldErrors.general = "An unknown error occurred. Please try again.";
        }
        setError(fieldErrors);
      } else {
        console.error("Error during Login", err);
        setError({ general: "Login failed. Please try again." });
      }
    }
    }


  return(
   <div className="h-screen flex justify-center flex-col">
     <div className="flex justify-center">
       <div>
          
          <Heading type={"signin"} />
        
              <LabelledInput label="Username" placeholder="shreyank@gmail.com" onChange={(e) => {
                  setUserInputs({
                      ...userInputs,
                      email: e.target.value
                  })
              }} />

                   {error.email && (
                     <div className="text-red-500 text-sm mt-2">{error.email}</div>
                   )}

              <LabelledInput label="Password" type={"password"} placeholder="123456" onChange={(e) => {
                  setUserInputs({
                      ...userInputs,
                      password: e.target.value
                  })
              }} />
                   
              <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"> Login </button>

              {error.general && <div className="text-red-600 text-md mt-2 text-center bg-red-50 p-2 rounded-lg">{error.general}</div>}

          </div>
      </div>
  </div>
  );
} 