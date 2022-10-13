import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Alert from '../components/ui/alert';
import Input from '../components/ui/forms/input';
import Button from '../components/ui/button';

type FormValues = {
  email: string;
}

const forgotFormSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required('Email is required'),
});

const defaultValues = {
  email: "",
};


const ForgotPassword = () => {

  //let [serverError, setServerError] = useState<string | null>(null);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(forgotFormSchema),
  });

  function onSubmit({ email }: FormValues) {
      console.log("email: " + email);
      setErrorMsg("Invalid credentials!");
      setForgotLoading(true);
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
          <span className="mt-3 text-[#888888] text-sm w-80 text-center">Enter your email to renew your password</span>
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
                  label="Email"
                  {...register('email')}
                  type="email"
                  variant="outline"
                  className="mb-5"
                  placeholder="Enter email"
                  error={errors.email?.message!}
                />
                <Button
                  className="h-11 w-full mt-8"
                  loading={forgotLoading}
                  disabled={forgotLoading}
                >
                  {forgotLoading ? "Loading..." : "SEND"}
                </Button>

            </form>
            <div className="w-full flex mt-5 mb-20 justify-center">
              <span className="text-xs text-[#888888] mr-2">Remember your password?</span>
              <div className="flex">
                <a href="/login" className="text-xs text-accent">Login</a>
              </div>
            </div>
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

export default ForgotPassword;
