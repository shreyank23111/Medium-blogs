import { Login } from "../Components/Auth/Login"
import { Quote } from "../Components/Quote"

export const Signin = () => {
  return <div>
     <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
               <Login/>
            </div>
            <div className="hidden lg:block">
                <Quote/>
            </div>
        </div>
  </div>
}
