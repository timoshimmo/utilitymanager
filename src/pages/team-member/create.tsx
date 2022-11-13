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
  firstName: string;
  lastName: string;
  email: string;
  mobileNo: string;
  branch: string;
  userType: any;
  teamGroup: any;
}

const teamMemberSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('Firstname is required'),
  lastName: yup
    .string()
    .required('LastName is required'),
  email: yup
    .string()
    .email("Invalid email format")
    .required('Email is required'),
  mobileNo: yup
    .string()
    .required('Mobile No. is required'),
  branch: yup.string().required('Branch is required!'),
  userType: yup.object().required('User type must be selected!'),
  teamGroup: yup.object().required('Team group must be selected!'),
});

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  mobileNo: "",
  branch: "",
  userType: null,
  teamGroup: null,
};


const CreateTeamMember = () => {

  //let [serverError, setServerError] = useState<string | null>(null);
  const [teamMemberLoading, setTeamMemberLoading] = useState(false);
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
    resolver: yupResolver(teamMemberSchema),
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

  function onSubmit({ firstName, lastName, email, mobileNo, branch, userType, teamGroup }: FormValues) {

    //console.log("NAME: " + branchAddress);
    if(!teamMemberLoading) {

      setTeamMemberLoading(true);

      let mDiscoID = '';
      if (typeof localStorage !== 'undefined') {
          const dId = localStorage.getItem('discoId');
          if(dId !== null) {
            mDiscoID = dId;
          }
      }

      const obj = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNo: mobileNo,
        branch: branch,
        userType: userType.value,
        teamGroup: teamGroup.id
      };

      //console.log(JSON.stringify(obj));
      //setTeamMemberLoading(false);

     SERVICES.post(`team-member/create`, obj)
      .then(response => {
        const res = response.data;
      //  console.log(res);
        setTeamMemberLoading(false);
        setSuccessMsg("Team Member Created Successfully!");

      })
      .catch(error => {
        setTeamMemberLoading(false);
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
        <span className="text-body text-[28px] font-bold">Create Team Member</span>
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
                    label="Firstname"
                    {...register('firstName')}
                    type="text"
                    variant="outline"
                    compulsory={true}
                    className="mb-5"
                    placeholder="Enter Firstname"
                    error={errors.firstName?.message!}
                  />

                  <Input
                    label="Lastname"
                    {...register('lastName')}
                    type="text"
                    variant="outline"
                    compulsory={true}
                    className="mb-5"
                    placeholder="Enter Lastname"
                    error={errors.lastName?.message!}
                  />

                  <Input
                    label="Email"
                    {...register('email')}
                    type="email"
                    variant="outline"
                    compulsory={true}
                    className="mb-5"
                    placeholder="Enter email"
                    error={errors.email?.message!}
                  />

                  <Input
                    label="Mobile number"
                    {...register('mobileNo')}
                    type="text"
                    variant="outline"
                    compulsory={true}
                    className="mb-5"
                    placeholder="Enter Mobile number"
                    error={errors.mobileNo?.message!}
                  />

                  <TeamUserTypeSelect
                    control={control}
                    error={(errors?.userType as any)?.message}
                    compulsory={true}
                  />

                  <TeamGroupSelect
                    groups={allGroups}
                    control={control}
                    error={(errors?.teamGroup as any)?.message}
                    compulsory={true}
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

                  <Button
                    className="h-11 w-full mt-8"
                    loading={teamMemberLoading}
                    disabled={teamMemberLoading}
                  >
                    {teamMemberLoading ? "Loading..." : "SAVE"}
                  </Button>
                </>
              ) : null}
          </form>
        </div>
      </div>

  );

}

export default CreateTeamMember;
