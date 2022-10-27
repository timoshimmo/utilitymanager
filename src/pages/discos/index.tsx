import React, { useState, useEffect } from 'react';
import Button from '../../components/ui/button';
import { useHistory } from 'react-router-dom';
import Input from '../../components/ui/forms/input';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FilterIcon } from '../../components/icons/filter-icon';
import { SearchWhiteIcon } from '../../components/icons/search-white-icon';
import DiscosList from "../../components/discos/disco-list";
import SERVICES from '../../util/webservices';
import { ROUTES } from '../../lib/route-links';
//import axios from 'axios';

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

const GetDiscos = () => {

  const history = useHistory();
  const [allDiscos, setAllDiscos] = useState([]);

  useEffect(() => {
    retrieveDiscos();
 }, []);


  const navNew = () => {
      history.push(ROUTES.REGISTER_DISCO);
  }

  const retrieveDiscos = () => {
    SERVICES.get(`discos/get`)
    .then(response => {
        const res = response.data.data;
        setAllDiscos(res);
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
      <div className="w-full h-full py-10 px-8 flex flex-col">
        <div className="flex items-center flex-col bg-[#FFFFFF] shadow rounded pt-6 pb-10 grow">
          <div className="w-full flex justify-between items-center px-6">
            <span className="text-lg text-body font-semibold">Discos Table</span>
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
            <DiscosList
              discos={allDiscos}
            />
          </div>
        </div>
      </div>
  );

};

export default GetDiscos;
