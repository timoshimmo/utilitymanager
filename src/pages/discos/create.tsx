import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Alert from '../../components/ui/alert';
import Input from '../../components/ui/forms/input';
import Button from '../../components/ui/button';
//import axios from 'axios';
import SERVICES from '../../util/webservices';
import { BackArrowIcon } from '../../components/icons/back-arrow';

type FormValues = {
  name: string;
  fullName: string;
  email: string;
  mobileNo: string;
  address: string;
}

const adminSchema = yup.object().shape({
  name:  yup
    .string()
    .required('You must enter a DISCO name'),
  fullName: yup
    .string()
    .required('Fullname is required'),
  email: yup
    .string()
    .email("Invalid email format")
    .required('Email is required'),
  mobileNo: yup.string().required('Mobile No. is required!'),
  address: yup
    .string()
    .required('Address is required'),
});

const defaultValues = {
  name: "",
  fullName: "",
  email: "",
  mobileNo: "",
  address: "",
};


const RegisterDiscos = () => {

  //let [serverError, setServerError] = useState<string | null>(null);
  const [adminLoading, setAdminLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(adminSchema),
  });

  function onSubmit({ name, fullName, email, mobileNo, address }: FormValues) {

    if(!adminLoading) {

      setAdminLoading(true);

      const obj = {
        name: name,
        fullName: fullName,
        email: email,
        contact: mobileNo,
        hqAddress: address,
      };

      SERVICES.post(`discos/create`, obj)
      .then(response => {
        const res = response.data;
        console.log(res);
        setAdminLoading(false);
        setSuccessMsg("Admin generated username and password have been sent to the registered email. Use credentials to access dashboard");

      })
      .catch(error => {
        setAdminLoading(false);
        const resError = error.response ? error.response.data.message : "Something went wrong please try again";
        setErrorMsg(resError);
      })

    }
  }

  return (
    <div className="flex items-center flex-col w-full bg-[#FFFFFF] rounded mt-10 pt-6 px-20 pb-10">
      <div className="flex w-full items-center">
        <button className="relative h-7 w-7 flex justify-center items-center rounded-full hover:bg-gray-200 focus:bg-gray-200 mr-6">
          <BackArrowIcon className="w-6 h-6" />
        </button>
        <span className="text-body text-[28px] font-bold">Create DISCO</span>
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
                    label="DISCO name"
                    {...register('name')}
                    type="text"
                    variant="outline"
                    className="mb-5"
                    placeholder="Enter DISCO name"
                    error={errors.name?.message!}
                  />

                  <Input
                    label="Your fullname"
                    {...register('fullName')}
                    type="text"
                    variant="outline"
                    className="mb-5"
                    placeholder="Enter your full name"
                    error={errors.fullName?.message!}
                  />

                  <Input
                    label="Email"
                    {...register('email')}
                    type="email"
                    variant="outline"
                    className="mb-5"
                    placeholder="Enter a valid email"
                    error={errors.email?.message!}
                  />

                  <Input
                    label="Mobile number"
                    {...register('mobileNo')}
                    type="text"
                    variant="outline"
                    className="mb-5"
                    placeholder="Enter mobile number"
                    error={errors.mobileNo?.message!}
                  />

                  <Input
                    label="Hq Address"
                    {...register('address')}
                    type="text"
                    variant="outline"
                    className="mb-5"
                    placeholder="Enter address"
                    error={errors.address?.message!}
                  />

                  <Button
                    className="h-11 w-full mt-8"
                    loading={adminLoading}
                    disabled={adminLoading}
                  >
                    {adminLoading ? "Loading..." : "SAVE"}
                  </Button>
                </>
              ) : null}
          </form>
        </div>
      </div>
  );

}

export default RegisterDiscos;
