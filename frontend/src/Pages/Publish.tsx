import { Appbar } from "../Components/Appbar/nav"
import { CreateBlog } from "../Components/Create Blog/CreateBlog"
import  { useState } from "react";
import Modal from "../Components/Create Blog/Modal";

export const Publish = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div>
      <Appbar openModal={openModal} />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <CreateBlog />
      </Modal>
    </div>
  );
};