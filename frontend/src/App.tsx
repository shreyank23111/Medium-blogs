import { Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { SignUp } from "./Pages/Signup";
import { Signin } from "./Pages/Login";
import { Blog } from "./Pages/Blog";
import { Blogs } from "./Pages/Blogs";
import { Publish } from "./Pages/Publish";
import { Appbar } from "./Components/Appbar/nav";
import Modal from "./Components/Create Blog/Modal";
import { CreateBlog } from "./Components/Create Blog/CreateBlog";
import { useState } from "react";


function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    console.log("Opening modal");
    setModalOpen(true);
  };

  const closeModal = () => {
    console.log("Closing modal");
    setModalOpen(false);
  };


  return (
    <>
    <BrowserRouter>
    <Appbar openModal={openModal}/>
     <Suspense fallback={"loading..."}>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/blogs/get-blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/publish" element={<Publish />} />
        </Routes>
     </Suspense>
     <Modal isOpen={isModalOpen} onClose={closeModal}>
      <CreateBlog/>
     </Modal>
    </BrowserRouter>
    </>
  )
}

export default App
