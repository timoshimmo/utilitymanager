import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/button';
import { useHistory } from 'react-router-dom';
import Input from '../../../components/ui/forms/input';
import { FilterIcon } from '../../../components/icons/filter-icon';
import { SearchWhiteIcon } from '../../../components/icons/search-white-icon';
import ItemsRequestTable from "../../../components/projects/items-request-table";
import Card from '../../../components/ui/cards/card';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SERVICES from '../../../util/webservices';


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

const dummyProjects = [
  {
    "name": "Fix Transformer parts",
    "description": "Changing parts in a transformer",
    "totalQty": 200,
    "equipments": ["Battery", "Electricals", "Wires"],
    "status": 0
  },
  {
    "name": "Replace pole",
    "description": "Replacing a broken wooden pole to 30 feet cement pole",
    "totalQty": 350,
    "equipments": ["Pole"],
    "status": 0
  },
  {
    "name": "Fix meter",
    "description": "Fix 3 meters in an area",
    "totalQty": 450,
    "equipments": ["Meters", "Ladder"],
    "status": 1
  },
];


const GetItemsRequest = () => {

  const [requests, setRequests] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(searchSchema),
  });

  function onSubmit({ qdisco }: FormValues) {

    console.log("Searching for " + qdisco);
  }


  const retrieveRequest = () => {
    SERVICES.get(`item-request/get`)
    .then(response => {
        const res = response.data.data;
        setRequests(res);
    })
    .catch(error => {
        const resError = error.response ? error.response.data.message : "Something went wrong please try again";
        console.log(resError);
    })

  }

  return (

    <div className="w-full h-full px-8 py-10">
      <div className="flex items-center flex-col bg-[#FFFFFF] shadow rounded mt-4 pt-6 pb-10">
        <div className="w-full flex justify-between items-center px-6">
          <span className="text-lg text-body font-semibold">Item Request Table</span>
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
          </div>

          <div className="w-full mt-10">

            <ItemsRequestTable
                requests={requests}
              />

          </div>
        </div>

    </div>


  );

}

export default GetItemsRequest;
