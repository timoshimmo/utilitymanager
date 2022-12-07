import React, { useState } from "react";
import UpdateRequestCard from "../ui/cards/confirmation-card";
import {
  useModalAction,
  useModalState,
} from "../ui/modal/modal.context";
import { toast } from "react-toastify";
import SERVICES from '../../util/webservices';

const UpdateItemRequestView = () => {
  const [loading, setLoading] = useState(false);
  const { closeModal } = useModalAction();
  const { data } = useModalState();

  //let mTitle = '';
  let desc = '';

  if(data.status === 0) {
    desc = "Approve item availability?";
  }
  else {
    desc = "Disapprove item availability?";
  }



  async function handleUpdate() {
    if(!loading) {

      setLoading(true);

    /*  const obj = {
        ticketId: data.id
      };*/

      console.log("POPUP REQ ID: ", data.id);
      console.log("POPUP REQ STATUS: ", data.status);

      setLoading(false);
      closeModal();
      if (data.status === 0) {
        toast.success("Request has been approved!");
      }
      else {
        toast.success("Request has been disapproved!");
      }


    /*  SERVICES.put(`tickets/update`, obj)
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
      });
      */

    }


  }

  return (
    <UpdateRequestCard
      onCancel={closeModal}
      onConfirm={handleUpdate}
      confirmBtnText="Yes"
      title="Item Request Status"
      description={desc}
      confirmBtnLoading={loading}
    />
  );
};

export default UpdateItemRequestView;
