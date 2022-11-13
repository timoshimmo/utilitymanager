import React, { useState, useEffect } from 'react';
import Button from '../../components/ui/button';
import { useHistory } from 'react-router-dom';
import TicketsTable from "../../components/tickets/tickets-table";
import CardInfo from '../../components/ui/cards/card-info';
import CardGroup from '../../components/ui/cards/card-group';
import { CalendarIcon } from '../../components/icons/calendar';
import SERVICES from '../../util/webservices';
//import axios from 'axios';

const GetTickets = () => {

  const history = useHistory();
  const [allTickets, setAllTickets] = useState([]);

  useEffect(() => {
    retrieveTickets();
 }, []);


  const retrieveTickets = () => {
    SERVICES.get(`tickets/get`)
    .then(response => {
        const res = response.data.data;
        setAllTickets(res);
    })
    .catch(error => {
        const resError = error.response ? error.response.data.message : "Something went wrong please try again";
        console.log(resError);
        console.log(error.response.status);
        console.log(error.response.data.error);
    })

  }

  return (
      <div className="w-full h-full py-10 px-8 flex flex-col">
        <div className="w-full flex justify-end items-center">
          <div className="flex px-4 py-2 border border-gray-200 rounded items-center">
            <button className="relative h-7 w-7 flex justify-center items-center rounded-full hover:bg-gray-200 focus:bg-gray-200">
              <CalendarIcon className="w-5 h-5 text-accent"/>
            </button>
            <span className="text-accent text-xs font-semibold">1 Jan - 31 Dec 2022</span>
          </div>
        </div>
        <div className="w-full flex my-4">
          <CardGroup
            className="w-3/5 h-[180px] mr-4"
            titleLeft="OPEN TICKETS"
            titleRight="NEW TICKETS"
            subtitleLeft="LAST UPDATED 22 AUG 2022"
            subtitleRight="LAST UPDATED 22 AUG 2022"
            valueLeft="0"
            valueRight="0"
          />
          <CardInfo
            className="w-2/5 h-[180px]"
            title="CLOSED TICKETS"
            subtitle="LAST UPDATED 22 AUG 2022"
            value="0"
          />

        </div>
        <div className="flex items-center flex-col bg-[#FFFFFF] shadow rounded pt-6 pb-10 grow">
          <div className="w-full flex justify-between items-center px-6">
            <span className="text-lg text-body font-semibold">Support Tickets</span>
            <div className="flex grow justify-end items-center">
              <Button
              className="h-[36px] w-[160px] text-xs ml-5"
              variant="outline"
              >
                EXPORT CSV
              </Button>
            </div>
          </div>
          <div className="w-full mt-10">
            <TicketsTable
              tickets={allTickets}
            />
          </div>
        </div>
      </div>
  );

};

export default GetTickets;
