import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Alert from '../../components/ui/alert';
import Input from '../../components/ui/forms/input';
import Select from 'react-select';
import Button from '../../components/ui/button';
import { BackArrowIcon } from '../../components/icons/back-arrow';
import AssetTypeSelect from "../../components/ui/forms/asset-type-select";
import AssetStatusSelect from "../../components/ui/forms/asset-status-select";
import axios from 'axios';

type FormValues = {
  assetType: any;
  description: string;
  status: any;
  location: string;
  value: string;
}

const superadminSchema = yup.object().shape({
  assetType: yup.object().required('Permission type must be selected'),
  description: yup
    .string()
    .required('description is required'),
  status: yup
    .string()
    .required('Status is required'),
  location: yup.string().required('Mobile No. is required!'),
  value: yup.object().required('Permission type must be selected'),
});

const defaultValues = {
  assetType: null,
  description: "",
  status: null,
  location: "",
  value: "",
};


const CreateAssets = () => {

  //let [serverError, setServerError] = useState<string | null>(null);
  const [statusLoading, setStatusLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(superadminSchema),
  });

  function onSubmit({ assetType, description, status, location, value }: FormValues) {
      setSuccessMsg("Success");
      setErrorMsg("Error");
      setStatusLoading(true);
      console.log("Print: " + assetType + description + status + location + value);
      console.log("STATUS: " + successMsg + errorMsg);
  /*  if(!statusLoading) {

      setStatusLoading(true);

      let mDiscoID = '';
      if (typeof localStorage !== 'undefined') {
          const dId = localStorage.getItem('discoId');
          if(dId !== null) {
            mDiscoID = dId;
          }
      }

      const obj = {
        fullName: fullName,
        email: email,
        mobileNo: mobileNo,
        discoId: mDiscoID,
        permissionCode: permission.value
      };

      console.log(JSON.stringify(obj));
      setStatusLoading(false);

      axios.post(`http://localhost:4002/admins/register`, obj)
      .then(response => {
        const res = response.data;
        console.log(res);
        setStatusLoading(false);
        setSuccessMsg("Admin login username and password have been sent to the registered email. Use those credentials to access the dashboard");

      })
      .catch(error => {
        setStatusLoading(false);
        const resError = error.response ? error.response.data.message : "Something went wrong please try again";
        setErrorMsg(resError);
      });

    }*/
  }

  return (
    <div className="flex items-center flex-col w-full bg-[#FFFFFF] mt-10 pt-6 px-20 pb-10">
      <div className="flex w-full items-center">
        <button className="relative h-7 w-7 flex justify-center items-center rounded-full hover:bg-gray-200 focus:bg-gray-200 mr-6">
          <BackArrowIcon className="w-6 h-6" />
        </button>
        <span className="text-body text-[28px] font-bold">Create Asset</span>
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
                <AssetTypeSelect
                  control={control}
                  error={(errors?.assetType as any)?.message}
                  compulsory={true}
                />

                  <Input
                    label="Description/Name"
                    {...register('description')}
                    type="text"
                    variant="outline"
                    compulsory={true}
                    className="mb-5"
                    placeholder="Enter your descrition"
                    error={errors.description?.message!}
                  />

                  <AssetStatusSelect
                    control={control}
                    error={(errors?.status as any)?.message}
                    compulsory={true}
                  />

                  <Input
                    label="Location"
                    {...register('location')}
                    type="text"
                    variant="outline"
                    compulsory={true}
                    className="mb-5"
                    placeholder="Enter location"
                    error={errors.location?.message!}
                  />

                  <Input
                    label="Value"
                    {...register('value')}
                    type="text"
                    variant="outline"
                    compulsory={true}
                    className="mb-5"
                    placeholder="Enter Value"
                    error={errors.value?.message!}
                  />

                  <Button
                    className="h-11 w-full mt-8"
                    loading={statusLoading}
                    disabled={statusLoading}
                  >
                    {statusLoading ? "Loading..." : "SAVE"}
                  </Button>
                </>
              ) : null}
          </form>
        </div>
      </div>

  );

}

export default CreateAssets;
