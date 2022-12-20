import React, { useState } from "react";
import ConfirmationCard from "../ui/cards/confirmation-card";
import {
  useModalAction,
  useModalState,
} from "../ui/modal/modal.context";
import { toast } from "react-toastify";
import SERVICES from '../../util/webservices';

const DeleteView = () => {
  const [loading, setLoading] = useState(false);

  const { closeModal } = useModalAction();
  const { data } = useModalState();

  async function handleDelete() {
    if(!loading) {

      setLoading(true);

      const obj = {
        id: data.id,
      };

      SERVICES.post(data.link, obj)
      .then(response => {
          const res = response.data;
          setLoading(false);
          closeModal();
          toast.success("Deleted Successfully!");
      })
      .catch(error => {
          setLoading(false);
          closeModal();
          toast.error("Something went wrong, please try again");
          console.log(error.response.status);
          console.log(error.response.data.error);
      })

    }


  }

  return (
    <ConfirmationCard
      onCancel={closeModal}
      onConfirm={handleDelete}
      confirmBtnText="Yes"
      title="Delete"
      description="Are you sure you want to delete?"
      confirmBtnLoading={loading}
    />
  );
};

export default DeleteView;
