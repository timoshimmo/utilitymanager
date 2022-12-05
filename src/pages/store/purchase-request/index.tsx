import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/button';
import { useHistory } from 'react-router-dom';
import Input from '../../../components/ui/forms/input';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CardInfo from '../../../components/ui/cards/card-info';
import CardGroup from '../../../components/ui/cards/card-group';
import { FilterIcon } from '../../../components/icons/filter-icon';
import { SearchWhiteIcon } from '../../../components/icons/search-white-icon';
import InventoryTable from "../../../components/inventory/inventory-table";
import SERVICES from '../../../util/webservices';
import { ROUTES } from '../../../lib/route-links';

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

const dummyInventory = [
  {
    "name": "11KVA Transformers",
    "description": "33KVA Transformer with high performance",
    "quantity": 1,
    "status": 0
  },
  {
    "name": "10mm 20 feet cable",
    "description": "10mm wire for major cabling",
    "quantity": 2,
    "status": 0
  },
  {
    "name": "25 Feet Pole",
    "description": "Cement pole single pole",
    "quantity": 4,
    "status": 0
  },
];

const GetInventory = () => {

  const history = useHistory();
  const [inventory, setInventory] = useState([]);
  const [openTab, setOpenTab] = React.useState(1);

  useEffect(() => {
    retrieveInventory();
 }, []);

  const navNew = () => {
      history.push(ROUTES.CREATE_INVENTORY);
  }

  const retrieveInventory = () => {
    SERVICES.get(`team-member/get`)
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
        <div className="w-full mt-10">
          <ul
              className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
              role="tablist"
            >
              <li className="-mb-px mr-10 last:mr-0 text-center">
                <a
                  className={
                    "text-xs font-semibold uppercase py-1 block leading-normal " +
                    (openTab === 1
                      ? "text-accent"
                      : "text-gray-200")
                  }
                  onClick={e => {
                    e.preventDefault();
                    setOpenTab(1);
                  }}
                  data-toggle="tab"
                  href="#link1"
                  role="tablist"
                >
                  Inventory
                </a>
                {
                  openTab === 1
                  ?
                  (
                    <div className="w-full flex justify-center">
                      <div className="h-2 w-2 bg-accent rounded-full"></div>
                    </div>
                  )
                  :
                  null
                }
              </li>
              <li className="-mb-px mr-10 last:mr-0 text-center">
                <a
                  className={
                    "text-xs font-semibold uppercase px-1 py-1 block leading-normal " +
                    (openTab === 2
                      ? "text-accent"
                      : "text-gray-200")
                  }
                  onClick={e => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                   Purchase Request
                </a>
                {
                  openTab === 2
                  ?
                  (
                    <div className="w-full flex justify-center">
                      <div className="h-2 w-2 bg-accent rounded-full"></div>
                    </div>
                  )
                  :
                  null
                }
              </li>
              <li className="-mb-px mr-10 last:mr-0 text-center">
                <a
                  className={
                    "text-xs font-semibold uppercase py-1 block leading-normal " +
                    (openTab === 3
                      ? "text-accent"
                      : "text-gray-200")
                  }
                  onClick={e => {
                    e.preventDefault();
                    setOpenTab(3);
                  }}
                  data-toggle="tab"
                  href="#link3"
                  role="tablist"
                >
                   Items Request
                </a>
                {
                  openTab === 3
                  ?
                  (
                    <div className="w-full flex justify-center">
                      <div className="h-2 w-2 bg-accent rounded-full"></div>
                    </div>
                  )
                  :
                  null
                }
              </li>
            </ul>
        </div>
        <div className="flex items-center flex-col bg-[#FFFFFF] shadow rounded pt-6 pb-10">
          <div className="w-full flex justify-between items-center px-6">
            <span className="text-lg text-body font-semibold">Inventory Table</span>
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
              <InventoryTable
                inventory={dummyInventory}
              />
            </div>
          </div>
        </div>
  );
};

export default GetInventory;
