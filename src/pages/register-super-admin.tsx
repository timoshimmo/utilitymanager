import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Alert from '../components/ui/alert';
import Input from '../components/ui/forms/input';
import Button from '../components/ui/button';

type FormValues = {
  fullName: string;
  email: string;
  disco: string;
}

const superadminSchema = yup.object().shape({
  fullName: yup
    .string()
    .required('Fullname is required'),
  email: yup
    .string()
    .email("Invalid email format")
    .required('Email is required'),
  disco: yup.string().required('Select a DISCO'),
});

const defaultValues = {
  fullName: "",
  email: "",
  disco: "",
};


const RegisterSuperAdmin = () => {

  //let [serverError, setServerError] = useState<string | null>(null);
  const [adminLoading, setAdminLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(superadminSchema),
  });

  function onSubmit({ fullName, email, disco }: FormValues) {
      console.log("Full Name: " + fullName + " " + "Email: " + email);
      setErrorMsg("Invalid credentials!");
      setAdminLoading(true);
  }

  return (
      <div className="flex justify-center items-center w-full h-full py-10">
        <div className="flex items-center flex-col xs:w-5/6 w-2/5 bg-[#FFFFFF] rounded pt-6 px-6 pb-10 border border-gray-100">
          <img
            alt="Logo"
            src="/images/myutility_placeholder_logo.png"
            height="80"
            width="80"
          />
          <span className="mt-3 text-[#888888] text-sm w-80 text-center">Register super admin, we have made facility management experience easy</span>
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
                  label="Fullname"
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
                  label="Disco"
                  {...register('disco')}
                  type="text"
                  variant="outline"
                  className="mb-5"
                  placeholder="Select your DISCO"
                  error={errors.disco?.message!}
                />

                <Button
                  className="h-11 w-full mt-8"
                  loading={adminLoading}
                  disabled={adminLoading}
                >
                  {adminLoading ? "Loading..." : "REGISTER"}
                </Button>

            </form>
            <div className="w-full flex mt-5 mb-20 justify-center">
              <span className="text-xs text-[#888888] mr-2">Already registered?</span>
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

export default RegisterSuperAdmin;
