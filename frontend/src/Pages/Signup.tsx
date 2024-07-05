
import { Signup } from "../Components/Auth/Signup"
import { Quote } from "../Components/Quote"


export const SignUp = () => {
  return <div>
  <div className="grid grid-cols-1 lg:grid-cols-2">
         <div>
            <Signup/>
         </div>
         <div className="hidden lg:block">
             <Quote/>
         </div>
     </div>
</div>
}
