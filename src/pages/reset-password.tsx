import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Alert from '../components/ui/alert';
import PasswordInput from '../components/ui/forms/password-input';
import Button from '../components/ui/button';
import axios from 'axios';


type FormValues = {
  password: string;
  confirm: string;
}

interface ParamTypes {
  token: string;
  permissionCode: string;
}

const resetFormSchema = yup.object().shape({
  password:  yup.string().required('Password is required'),
  confirm: yup.string().required('Password is required'),
});

const defaultValues = {
  password: "",
  confirm: "",
};



const ResetPassword = () => {

  const [resetLoading, setResetLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const { permissionCode, token } = useParams<ParamTypes>();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(resetFormSchema),
  });

  function onSubmit({ password, confirm }: FormValues) {

      if(!resetLoading) {

        setResetLoading(true);

        const obj = {
          password: password
        };

        if(permissionCode !== "0") {
          axios.post(`https://utilityapi.onrender.com/admins/reset/${token}`, obj)
          .then(response => {
            const res = response.data;
            console.log(res);
            setResetLoading(false);
            setSuccessMsg("Your password was successfully reset. You can go ahead to login with your new password");

          })
          .catch(error => {
            setResetLoading(false);
            const resError = error.response ? error.response.data.message : "Something went wrong please try again";
            setErrorMsg(resError);
          })
        }
        else {
          axios.post(`https://utilityapi.onrender.com/users/reset/${token}`, obj)
          .then(response => {
            const res = response.data;
            console.log(res);
            setResetLoading(false);
            setSuccessMsg("Your password was successfully reset. You can go ahead to login with your new password")

          })
          .catch(error => {
            setResetLoading(false);
            const resError = error.response ? error.response.data.message : "Something went wrong please try again";
            setErrorMsg(resError);
          })
        }


      }
      /*console.log(`Password ${password} confrim: ${confirm}`);
      setErrorMsg("Invalid credentials!");
      setResetLoading(true);*/
  }

  return (

    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex items-center flex-col xs:w-5/6 w-2/5 bg-[#FFFFFF] shadow rounded-sm p-6">
        <img
          alt="Logo"
          src="/images/utility_manager_logo_main.png"
          height="80"
          width="80"
        />
        {successMsg ?
          (<span className="mt-3 text-accent font-semibold w-80 text-center">Password is reset!</span>)
          :
          (<span className="mt-3 text-[#888888] text-sm w-80 text-center">Enter new password to reset your password</span>)
        }

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
                  <PasswordInput
                    label="Password"
                    {...register('password')}
                    error={errors.password?.message!}
                    variant="outline"
                    className="mb-5"
                  />

                  <PasswordInput
                    label="Confirm password"
                    {...register('confirm')}
                    error={errors.confirm?.message!}
                    variant="outline"
                    className="mb-5"
                  />
                  <Button
                    className="h-11 w-full mt-8"
                    loading={resetLoading}
                    disabled={resetLoading}
                  >
                    {resetLoading ? "Loading..." : "RESET"}
                  </Button>
                </>
              ) : null}

          </form>
          <div className="w-full flex mt-8 justify-center">
            <div className="flex">
              <a href="#" className="text-xs text-accent">Privacy Policy </a>
              <a href="#" className="text-xs text-accent ml-2">Terms & Conditions</a>
            </div>
            <span className="text-xs text-[#888888] ml-2 mr-2"> | </span>
            <span className="text-xs text-[#888888]"> © 2022 Green & Smart Systems</span>
          </div>
        </div>
      </div>
    </div>
  );



}

export default ResetPassword;
