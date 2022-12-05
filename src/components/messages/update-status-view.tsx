import React, { useState } from "react";
import ConfirmationCard from "../ui/cards/confirmation-card";
import {
  useModalAction,
  useModalState,
} from "../ui/modal/modal.context";
import { toast } from "react-toastify";
import SERVICES from '../../util/webservices';

const UpdateStatusView = () => {
  const [loading, setLoading] = useState(false);

  const { closeModal } = useModalAction();
  const { data } = useModalState();

  async function handleUpdate() {
    console.log("Ticket ID:", data.id);
    console.log("STATUS VALUE:", data.val);
    if(!loading) {

      setLoading(true);

      const obj = {
        ticketId: data.id,
        status: data.val
      };

      SERVICES.put(`tickets/update`, obj)
      .then(response => {
          const res = response.data;
          setLoading(false);
          closeModal();
          toast.success("Ticket status succesfully updated");
      })
      .catch(error => {
          setLoading(false);
          const resError = error.response ? error.response.data.message : "Something went wrong, please try again";
          closeModal();
          toast.error("Something went wrong, please try again");
          console.log(resError);
          console.log(error.response.status);
          console.log(error.response.data.error);
      })

    }


  }

  return (
    <ConfirmationCard
      onCancel={closeModal}
      onConfirm={handleUpdate}
      confirmBtnText="Yes"
      title="Ticket Status"
      description="Are you sure you want to update ticket status?"
      confirmBtnLoading={loading}
    />
  );
};

export default UpdateStatusView;
