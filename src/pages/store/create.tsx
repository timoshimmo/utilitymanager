import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Alert from '../../components/ui/alert';
import Input from '../../components/ui/forms/input';
import Button from '../../components/ui/button';
import { BackArrowIcon } from '../../components/icons/back-arrow';
import TeamUserTypeSelect from "../../components/ui/forms/team-user-type-select";
import TeamGroupSelect from "../../components/ui/forms/team-group-select";
//import axios from 'axios';
import SERVICES from '../../util/webservices';

type FormValues = {
  name: string;
  description: string;
  value: number;
  quantity: number;
}

const inventorySchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required'),
  description: yup
    .string()
    .required('Description is required'),
  value: yup
    .string()
    .required('Value is required'),
  quantity: yup.string().required('Quantity is required!')
});

const defaultValues = {
  name: "",
  description: "",
  value: 0,
  quantity: 0,
};


const CreateInventory = () => {

  //let [serverError, setServerError] = useState<string | null>(null);
  const [inventoryLoading, setInventoryLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [allGroups, setAllGroups] = useState([]);

  useEffect(() => {
    retrieveTeamGroups();
 }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(inventorySchema),
  });

  const retrieveTeamGroups = () => {
    SERVICES.get(`teamgroup/get`)
    .then(response => {
        const res = response.data.data;
        setAllGroups(res);
    })
    .catch(error => {
        const resError = error.response ? error.response.data.message : "Something went wrong please try again";
        console.log(resError);
    })

  }

  function onSubmit({ name, description, value, quantity }: FormValues) {

    //console.log("NAME: " + branchAddress);
    if(!inventoryLoading) {

      setInventoryLoading(true);

      let mDiscoID = '';
      if (typeof localStorage !== 'undefined') {
          const dId = localStorage.getItem('discoId');
          if(dId !== null) {
            mDiscoID = dId;
          }
      }

      const obj = {
        name: name,
        description: description,
        value: value,
        quantity: quantity
      };

      console.log(JSON.stringify(obj));
      //setInventoryLoading(false);

     SERVICES.post(`inventory/create`, obj)
      .then(response => {
        const res = response.data;
      //  console.log(res);
        setInventoryLoading(false);
        setSuccessMsg("Inventory Item Created Successfully!");

      })
      .catch(error => {
        setInventoryLoading(false);
        const resError = error.response ? error.response.data.message : "Something went wrong please try again";
        setErrorMsg(resError);
      });

    }
  }

  return (
    <div className="flex items-center flex-col w-full bg-[#FFFFFF] mt-10 pt-6 px-20 pb-10">
      <div className="flex w-full items-center">
        <button className="relative h-7 w-7 flex justify-center items-center rounded-full hover:bg-gray-200 focus:bg-gray-200 mr-6">
          <BackArrowIcon className="w-6 h-6" />
        </button>
        <span className="text-body text-[28px] font-bold">Create Inventory</span>
      </div>
      <div className="mt-8 w-full px-4">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {errorMsg ? (
                <Alert
                  message={errorMsg}
                  variant="error"
                  closeable={true}
                  className="my-4"
                  onClose={() => setErrorMsg("")}
                />
              ) : null}

              {successMsg ? (
                <Alert
                  message={successMsg}
                  variant="success"
                  className="my-4"
                  onClose={() => setSuccessMsg("")}
                />
              ) : null}

              {successMsg === '' ? (
                <>

                  <Input
                    label="Name"
                    {...register('name')}
                    type="text"
                    variant="outline"
                    compulsory={true}
                    className="mb-5"
                    placeholder="Enter name"
                    error={errors.name?.message!}
                  />

                  <Input
                    label="Description"
                    {...register('description')}
                    type="text"
                    variant="outline"
                    compulsory={true}
                    className="mb-5"
                    placeholder="Enter description"
                    error={errors.description?.message!}
                  />

                  <Input
                    label="Value"
                    {...register('value')}
                    type="text"
                    variant="outline"
                    compulsory={true}
                    className="mb-5"
                    placeholder="Enter value"
                    error={errors.value?.message!}
                  />

                  <Input
                    label="Quantity"
                    {...register('quantity')}
                    type="text"
                    variant="outline"
                    compulsory={true}
                    className="mb-5"
                    placeholder="Enter quantity"
                    error={errors.quantity?.message!}
                  />

                  <Button
                    className="h-11 w-full mt-8"
                    loading={inventoryLoading}
                    disabled={inventoryLoading}
                  >
                    {inventoryLoading ? "Loading..." : "SAVE"}
                  </Button>
                </>
              ) : null}
          </form>
        </div>
      </div>

  );

}

export default CreateInventory;
