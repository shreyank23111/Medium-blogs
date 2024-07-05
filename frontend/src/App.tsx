import { Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { SignUp } from "./Pages/Signup";
import { Signin } from "./Pages/Login";
import { Blog } from "./Pages/Blog";
import { Blogs } from "./Pages/Blogs";
import { Publish } from "./Pages/Publish";


function App() {


  return (
    <>
    <BrowserRouter>
     <Suspense fallback={"loading..."}>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/blogs/get-blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/publish" element={<Publish />} />
        </Routes>
     </Suspense>
    </BrowserRouter>
    </>
  )
}

export default App
