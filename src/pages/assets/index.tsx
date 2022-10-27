import React, { useState } from 'react';
import Button from '../../components/ui/button';
import { useHistory } from 'react-router-dom';
import Input from '../../components/ui/forms/input';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FilterIcon } from '../../components/icons/filter-icon';
import { SearchWhiteIcon } from '../../components/icons/search-white-icon';

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

const GetManagers = () => {

  const history = useHistory();

  const navNew = () => {
      history.push('/create-asset');
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
        <div className="flex items-center flex-col bg-[#FFFFFF] shadow rounded pt-6 pb-10">
          <div className="w-full flex justify-between items-center px-6">
            <span className="text-lg text-body font-semibold">Assets Table</span>
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

            <table className="table-auto w-full mt-10 flex-1">
              <thead className="bg-accent-300">
                <tr>
                  <th className="py-3 pl-6 text-xs">FULLNAME</th>
                  <th className="py-3 text-xs">USERNAME</th>
                  <th className="py-3 text-xs">EMAIL</th>
                  <th className="py-3 pr-6 text-xs">PHONE NO.</th>
                  <th className="py-3 pr-6 text-xs">STATUS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                 <td className="pl-6 py-2"><span className="text-body text-[12px] uppercase">Gbenga Daniels</span></td>
                 <td className="py-2"><span className="text-body text-[12px] uppercase">gbendan213</span></td>
                 <td className="py-2"><span className="text-body text-[12px] uppercase">gbenga2dan@gmail.com</span></td>
                 <td className="pr-6"><span className="text-body text-[12px] uppercase">0803100011</span></td>
                 <td className="pr-6"><span className="text-body text-[12px] uppercase text-[#1BBC2B]">Active</span></td>
               </tr>
              </tbody>
            </table>
          </div>
        </div>
  );
};

export default GetManagers;
