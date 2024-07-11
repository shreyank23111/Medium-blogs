import { SignupInput, signupInput } from "@shreyank23/medium-common";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../config";
import { LabelledInput } from "./LabelledInputs";
import { Heading } from "./Heading";
import { useSetRecoilState } from "recoil";
import { authState } from "../../Store/authState";

interface ServerError {
  field: string;
  message: string;
}

export const Signup = () => {
  const navigate = useNavigate();
  const setAuthState = useSetRecoilState(authState);
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [userInputs, setUserInputs] = useState<SignupInput>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  async function sendRequest() {
    const validate = signupInput.safeParse(userInputs);

    if (!validate.success) {
      const zodErrors: { [key: string]: string } = {};
      validate.error.errors.forEach((err) => {
        zodErrors[err.path[0] as string] = err.message;
      });
      setError(zodErrors);
      return;
    }

    try {

      setError({});

      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signup`,
        userInputs,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("token", response.data.token);

      setAuthState({
        isAuthenticated: true,
        user: response.data.user
      })
      navigate("/blogs");
      setError({});

    } catch (err) {
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
        console.error("Error during signup", err);
        setError({ general: "Signup failed. Please try again." });
      }
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full max-w-md p-8 rounded-lg shadow-md bg-slate-50">
        <Heading type={"signup"} />
        <LabelledInput
          label="FirstName"
          placeholder="Shreyank"
          onChange={(e) => {
            setUserInputs({
              ...userInputs,
              firstName: e.target.value,
            });
          }}
        />
        {error.firstName && (
          <div className="text-red-500 text-sm mt-2">{error.firstName}</div>
        )}

        <LabelledInput
          label="LastName"
          placeholder="Desai"
          onChange={(e) => {
            setUserInputs({
              ...userInputs,
              lastName: e.target.value,
            });
          }}
        />
        {error.lastName && (
          <div className="text-red-500 text-sm mt-2">{error.lastName}</div>
        )}

        <LabelledInput
          label="Username"
          placeholder="shreyank@gmail.com"
          onChange={(e) => {
            setUserInputs({
              ...userInputs,
              email: e.target.value,
            });
          }}
        />
        {error.email && (
          <div className="text-red-500 text-sm mt-2">{error.email}</div>
        )}
        {error.general && (
          <div className="text-red-500 text-sm mt-2">{error.general}</div>
        )}

        <LabelledInput
          label="Password"
          type={"password"}
          placeholder="min 6 characters"
          onChange={(e) => {
            setUserInputs({
              ...userInputs,
              password: e.target.value,
            });
          }}
        />
        {error.password && (
          <div className="text-red-500 text-sm mt-2">{error.password}</div>
        )}

        <button
          onClick={sendRequest}
          type="button"
          className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Signup
        </button>
      </div>
    </div>
  );
};
