import React, { useState } from "react";
import UpdateRequestCard from "../ui/cards/update-request-card";
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


  async function handleConfirm(status: number) {

    if(!loading) {

      setLoading(true);

      const obj = {
        itemId: data.id,
        status: status
      };

      SERVICES.put(`item-request//update/status`, obj)
      .then(response => {
          const res = response.data;
          setLoading(false);
          closeModal();
          toast.success("Request has been approved!");
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
    }
  }

/*  async function handleDelete() {

    if(!loading) {

      setLoading(true);

      const obj = {
        itemId: data.id,
        status: 2
      };

      SERVICES.post(`item-request//update/status`, obj)
      .then(response => {
          const res = response.data;
          setLoading(false);
          closeModal();
          toast.success("Request has been approved!");
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
    }

  }

  */

  return (
    <UpdateRequestCard
      onCancel={()=>handleConfirm(2)}
      onClose={closeModal}
      onConfirm={()=>handleConfirm(1)}
      confirmBtnText="Yes"
      cancelBtnText="Not Available"
      title="Item Request Status"
      description="Is this item available?"
      confirmBtnLoading={loading}
    />
  );
};

export default UpdateItemRequestView;
