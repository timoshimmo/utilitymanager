import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Alert from '../../components/ui/alert';
import Input from '../../components/ui/forms/input';
import Button from '../../components/ui/button';
import { BackArrowIcon } from '../../components/icons/back-arrow';
//import axios from 'axios';
import SERVICES from '../../util/webservices';

type FormValues = {
  name: string;
  branch: string;
  branchAddress: string;
}

const teamGroupSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required'),
  branch: yup.string().required('Branch is required!'),
  branchAddress: yup.string().required('Address is required!'),
});

const defaultValues = {
  name: "",
  branch: "",
  branchAddress: "",
};


const CreateTeamGroup = () => {

  //let [serverError, setServerError] = useState<string | null>(null);
  const [teamGroupLoading, setTeamGroupLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(teamGroupSchema),
  });

  function onSubmit({ name, branch, branchAddress }: FormValues) {

    console.log("NAME: " + branchAddress);

    if(!teamGroupLoading) {

      setTeamGroupLoading(true);

      let mDiscoID = '';
      if (typeof localStorage !== 'undefined') {
          const dId = localStorage.getItem('discoId');
          if(dId !== null) {
            mDiscoID = dId;
          }
      }

      const obj = {
        name: name,
        branch: branch,
        branchAddress: branchAddress,
      };

      //console.log(JSON.stringify(obj));
      //setTeamGroupLoading(false);

      SERVICES.post(`teamgroup/create`, obj)
      .then(response => {
        const res = response.data;
      //  console.log(res);
        setTeamGroupLoading(false);
        setSuccessMsg("Team Group Created Successfully!");

      })
      .catch(error => {
        setTeamGroupLoading(false);
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
        <span className="text-body text-[28px] font-bold">Create Team Group</span>
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
                    placeholder="Enter team group name"
                    error={errors.name?.message!}
                  />

                  <Input
                    label="Branch"
                    {...register('branch')}
                    type="text"
                    variant="outline"
                    compulsory={true}
                    className="mb-5"
                    placeholder="Enter DISCO branch"
                    error={errors.branch?.message!}
                  />

                  <Input
                    label="Address"
                    {...register('branchAddress')}
                    type="text"
                    variant="outline"
                    compulsory={true}
                    className="mb-5"
                    placeholder="Enter Branch Address"
                    error={errors.branchAddress?.message!}
                  />

                  <Button
                    className="h-11 w-full mt-8"
                    loading={teamGroupLoading}
                    disabled={teamGroupLoading}
                  >
                    {teamGroupLoading ? "Loading..." : "SAVE"}
                  </Button>
                </>
              ) : null}
          </form>
        </div>
      </div>

  );

}

export default CreateTeamGroup;
