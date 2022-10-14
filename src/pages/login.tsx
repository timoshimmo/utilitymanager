import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Alert from '../components/ui/alert';
import Input from '../components/ui/forms/input';
import PasswordInput from '../components/ui/forms/password-input';
import Button from '../components/ui/button';
import axios from 'axios';

type FormValues = {
  username: string;
  password: string;
}

const loginFormSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup.string().required('Password is required'),
});

const defaultValues = {
  username: "",
  password: "",
};


const Login = () => {

  //let [serverError, setServerError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(loginFormSchema),
  });

  function onSubmit({ username, password }: FormValues) {

    if(!loginLoading) {

      setLoginLoading(true);

      const obj = {
        username: username,
        password: password
      };

      axios.post(`https://myutilityapi.herokuapp.com/admins/login`, obj)
      .then(response => {
        const res = response.data;
        console.log(res);
        setLoginLoading(false);

      })
      .catch(error => {
        setLoginLoading(false);
        const resError = error.response ? error.response.data.message : "Something went wrong please try again";
        setErrorMsg(resError);
      })

    }
  }

  return (
      <div className="flex justify-center items-center w-full h-screen">
        <div className="flex items-center flex-col xs:w-5/6 w-2/5 bg-[#FFFFFF] rounded pt-6 px-6 pb-10 border border-gray-100">
          <img
            alt="Logo"
            src="/images/myutility_placeholder_logo.png"
            height="80"
            width="80"
          />
          <span className="mt-3 text-[#888888] text-sm w-80 text-center">Login to continue, we have made facility management experience easy</span>
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
                <Input
                  label="Username"
                  {...register('username')}
                  type="text"
                  variant="outline"
                  className="mb-5"
                  placeholder="Enter username"
                  error={errors.username?.message!}
                />
                <PasswordInput
                  label="Password"
                  {...register('password')}
                  forgotPassHelpText={"Forgot Password"}
                  error={errors.password?.message!}
                  variant="outline"
                  className="mb-5"
                  placeholder="*********"
                  forgotPageLink="/forgot-password"
                />
                <Button
                  className="h-11 w-full mt-8"
                  loading={loginLoading}
                  disabled={loginLoading}
                >
                  {loginLoading ? "Loading..." : "LOGIN"}
                </Button>
            </form>
            <div className="w-full flex mt-5 mb-20 justify-center">
              <span className="text-xs text-[#888888] mr-2">Don't have an admin account?</span>
              <div className="flex">
                <a href="/login" className="text-xs text-accent">Register</a>
              </div>
            </div>
            <div className="w-full flex mt-8 justify-center">
              <div className="flex">
                <a href="/register-admin" className="text-xs text-accent">Privacy Policy </a>
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

export default Login;
