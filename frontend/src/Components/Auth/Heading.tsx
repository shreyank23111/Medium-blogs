import { Link  } from 'react-router-dom';

interface HeadingInputs {
  type: "signin" | "signup",
}

export const Heading = ({type}: HeadingInputs) => {
  return <div className="px-10">
  <div className="text-3xl font-extrabold">
      {type === "signin" ? "Create an Account": "Create an Account"}
  </div>
  <div className="text-slate-500">
       {type === "signin" ? "Don't have an account?" : "Already have an account?" } 
      {<Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/login"}>
          {type === "signin" ? "Sign up" : "Sign in"}
      </Link> }
      
  </div>
</div>
}