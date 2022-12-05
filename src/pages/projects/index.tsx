import React, { useState, useEffect } from 'react';
import Button from '../../components/ui/button';
import { useHistory } from 'react-router-dom';
import Input from '../../components/ui/forms/input';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CardInfo from '../../components/ui/cards/card-info';
import CardGroup from '../../components/ui/cards/card-group';
import { FilterIcon } from '../../components/icons/filter-icon';
import { SearchWhiteIcon } from '../../components/icons/search-white-icon';
import ProjectsTable from "../../components/projects/projects-table";
import SERVICES from '../../util/webservices';
import { ROUTES } from '../../lib/route-links';

type FormValues = {
  qdisco: string;
}

const searchSchema = yup.object().shape({
  qdisco: yup
    .string()
    .required('Search text is required'),
});


const defaultValues = {
  qdisco: "",
};

const GetProjects = () => {

  const history = useHistory();
  const [inventory, setInventory] = useState([]);
  const [openTab, setOpenTab] = React.useState(1);

  useEffect(() => {
    retrieveProjects();
 }, []);

  const navNew = () => {
      history.push(ROUTES.CREATE_PROJECTS);
  }

  const retrieveProjects = () => {
    SERVICES.get(`projects/get`)
    .then(response => {
        const res = response.data.data;
        setInventory(res);
    })
    .catch(error => {
        const resError = error.response ? error.response.data.message : "Something went wrong please try again";
        console.log(resError);
    })

  }

  function onSubmit({ qdisco }: FormValues) {
    console.log("Searching for " + qdisco);
  }


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(searchSchema),
  });

  return (
      <div className="w-full h-full py-10 px-8">
        <div className="w-full flex my-4">
          <CardInfo
            className="w-2/5 h-[180px] mr-4"
            title="PROJECTS"
            subtitle="TOTAL PROJECTS"
            value="0"
          />
          <CardGroup
            className="w-3/5 h-[180px]"
            titleLeft="PENDING PROJECTS"
            titleRight="COMPLETED PROJECTS"
            subtitleLeft="LAST UPDATED 22 AUG 2022"
            subtitleRight="LAST UPDATED 22 AUG 2022"
            valueLeft="0"
            valueRight="0"
          />
        </div>
        <div className="flex items-center flex-col bg-[#FFFFFF] shadow rounded pt-6 pb-10">
          <div className="w-full flex justify-between items-center px-6">
            <span className="text-lg text-body font-semibold">Projects Table</span>
              <div className="flex grow justify-end items-center px-20">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="flex">
                    <div className="flex relative">
                      <Input
                        {...register('qdisco')}
                        type="text"
                        variant="search"
                        placeholder="Search"
                        className="w-[250px]"
                        dimension="small"
                      />
                      <label
                        className="absolute right-3 top-5 -mt-2 text-body cursor-pointer"
                      >
                        <FilterIcon className="w-3 h-3"/>
                      </label>

                    </div>
                      <Button
                        className="h-[36px] w-13 rounded-none text-xs"
                      >
                        <SearchWhiteIcon className="w-3 h-3" />
                      </Button>
                  </div>
                </form>
                <Button
                className="h-[36px] w-[160px] text-xs ml-5"
                variant="outline"
                >
                  EXPORT CSV
                </Button>
              </div>
              <Button
              className="h-[36px] w-[120px] text-xs"
              onClick={navNew}
              >
                ADD NEW
              </Button>
            </div>

            <div className="w-full mt-10">
              <ProjectsTable
                projects={inventory}
              />
            </div>
          </div>
        </div>
  );
};

export default GetProjects;
