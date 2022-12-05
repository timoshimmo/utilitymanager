import React, { useState, useEffect } from 'react';
import Button from '../../components/ui/button';
import { useHistory } from 'react-router-dom';
import Input from '../../components/ui/forms/input';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FilterIcon } from '../../components/icons/filter-icon';
import { SearchWhiteIcon } from '../../components/icons/search-white-icon';
import TeamGroupTable from "../../components/team-groups/team-group-table";
import GetTeamMembers from '../team-member';
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

const GetTeamGroups = () => {

  const history = useHistory();
  const [allGroups, setAllGroups] = useState([]);
  const [openTab, setOpenTab] = React.useState(1);

  useEffect(() => {
    retrieveTeamGroups();
 }, []);

  const navNew = () => {
      history.push(ROUTES.CREATE_TEAM_GROUP);
  }

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
                  Groups
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
                  Members
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
            </ul>
        </div>
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6">
          <div className="flex-auto">
            <div className="tab-content tab-space">
              <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                <div className="flex items-center flex-col bg-[#FFFFFF] shadow rounded pt-6 pb-10">
                  <div className="w-full flex justify-between items-center px-6">
                    <span className="text-lg text-body font-semibold">Team Groups Table</span>
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
                      <TeamGroupTable
                        groups={allGroups}
                      />
                    </div>
                  </div>
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <GetTeamMembers />
                </div>
              </div>
            </div>
          </div>

        </div>
  );
};

export default GetTeamGroups;
