import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAtom } from "jotai";
import Alert from '../../components/ui/alert';
import Input from '../../components/ui/forms/input';
import Button from '../../components/ui/button';
import { BackArrowIcon } from '../../components/icons/back-arrow';
import { PlusIcon } from '../../components/icons/plus-icon';
import ProjectEquipmentsSelect from "../../components/ui/forms/project-equipments-select";
import TeamGroupSelect from "../../components/ui/forms/team-group-select";
import MembersDisplay from "../../components/projects/group-members-display";
import Card from '../../components/ui/cards/card';
import {
  equipsAtom
} from "../../contexts/equipments";
//import axios from 'axios';
import SERVICES from '../../util/webservices';
import { useModalAction } from "../../components/ui/modal/modal.context";

type FormValues = {
  title: string;
  description: string;
  location: string;
  teamGroup: any;
}

const projectSchema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required'),
  description: yup
    .string()
    .required('Description is required'),
  location: yup
    .string()
    .required('Location is required'),
  teamGroup: yup
    .object()
    .required('Team must be selected')
});

const defaultValues = {
  title: "",
  description: "",
  location: "",
  teamGroup: ""
};

/*
const data = [
  { value: 'pole', label: 'Pole' },
  { value: 'meter', label: 'Meter' },
  { value: 'transformer', label: 'Transformer' },
  { value: 'cables', label: 'Cables' }
];

*/


const CreateProject = () => {

  //let [serverError, setServerError] = useState<string | null>(null);
  const [projectLoading, setProjectLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [allGroups, setAllGroups] = useState([]);
  const [data, setData] = useState([]);
  const [newEquipmentList] = useAtom(equipsAtom);


//  const [group, setGroup] = useState({});

const { openModal } = useModalAction();

  useEffect(() => {
    retrieveTeamGroups();
    retrieveInventory();
 }, []);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(projectSchema),
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

  const retrieveInventory = () => {
    SERVICES.get(`inventory/get`)
    .then(response => {
        const res = response.data.data;
        setData(res);
    })
    .catch(error => {
        const resError = error.response ? error.response.data.message : "Something went wrong please try again";
        console.log(resError);
    })

  }

  const newArr = newEquipmentList.filter(equip => equip.name !== "");
  console.log("EQUIPS", newArr);

  function onSubmit({ title, description, location, teamGroup }: FormValues) {
  //  e.preventDefault();

    console.log("NAME: " + title);
    if(!projectLoading) {

      setProjectLoading(true);

      let mDiscoID = '';
      if (typeof localStorage !== 'undefined') {
          const dId = localStorage.getItem('discoId');
          if(dId !== null) {
            mDiscoID = dId;
          }
      }

      const filArr = newEquipmentList.filter(equip => equip.name !== "");
      console.log("REQUEST EQUIPS", filArr);

      const obj = {
        title: title,
        description: description,
        location: location,
        group: teamGroup.id,
        equipments: filArr,
        status: 0
      };

      console.log(JSON.stringify(obj));
      //setProjectLoading(false);

     SERVICES.post(`projects/create`, obj)
      .then(response => {
        const res = response.data;
      //  console.log(res);
        setProjectLoading(false);
        setSuccessMsg("Project Created Successfully!");

      })
      .catch(error => {
        setProjectLoading(false);
        const resError = error.response ? error.response.data.message : "Something went wrong please try again";
        setErrorMsg(resError);
      });

    }
  }

  const handleOpenNewEquipment = () => {
    openModal("ADD_EQUIPMENT", { data });
  }

  const group = watch("teamGroup");

  return (
    <div className="flex items-center flex-col w-full bg-[#FFFFFF] mt-10 pt-6 px-20 pb-10">
      <div className="flex w-full items-center">
        <button className="relative h-7 w-7 flex justify-center items-center rounded-full hover:bg-gray-200 focus:bg-gray-200 mr-6">
          <BackArrowIcon className="w-6 h-6" />
        </button>
        <span className="text-body text-[28px] font-bold">Create Project Task</span>
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
                    label="Title"
                    {...register('title')}
                    type="text"
                    variant="outline"
                    compulsory={true}
                    className="mb-5"
                    placeholder="Enter title"
                    error={errors.title?.message!}
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
                    label="Location"
                    {...register('location')}
                    type="text"
                    variant="outline"
                    compulsory={true}
                    className="mb-5"
                    placeholder="Enter location"
                    error={errors.location?.message!}
                  />

                  <TeamGroupSelect
                    groups={allGroups}
                    control={control}
                    error={(errors?.teamGroup as any)?.message}
                    compulsory={true}
                  />

                  {group !== "" &&
                    (
                      <MembersDisplay
                        members={group.members}
                      />
                  )}

                  <div
                  className="h-8 w-8 flex border border-accent justify-center items-center rounded-full hover:bg-gray-100 focus:bg-gray-100"
                  onClick={handleOpenNewEquipment}>
                    <PlusIcon className="w-5 h-5 text-accent" />
                  </div>

                    <div className="w-full flex mt-4">
                    {

                      newEquipmentList.length > 1 &&
                      (
                        newArr.map((item, index) => (
                        <div
                        key={index}
                        className="w-36 p-3 bg-light shadow rounded mr-2">
                          <div className="w-full h-full flex justify-between">
                            <span className="text-accent text-sm">{item.name}</span>
                            <span className="text-accent text-sm font-semibold">{item.quantity}</span>
                          </div>
                        </div>
                        ))
                      )
                    }
                    </div>

                  <Button
                    className="h-11 w-full mt-8"
                    loading={projectLoading}
                    disabled={projectLoading}
                  >
                    {projectLoading ? "Loading..." : "SAVE"}
                  </Button>
                </>
              ) : null}
          </form>
        </div>
      </div>

  );

}

export default CreateProject;
