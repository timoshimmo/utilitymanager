import React, { useState, useEffect } from 'react';
import Alert from '../../components/ui/alert';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SERVICES from '../../util/webservices';
import Input from '../../components/ui/forms/input';
import Button from '../../components/ui/button';
import cn from 'classnames';
import MessageCard from '../../components/messages/messageCard';
import MessageUserTop from '../../components/messages/message-user-top';
import MessageGroup from '../../components/messages/message-group';
import { SearchDarkIcon } from '../../components/icons/search-dark-icon';
import Avatar from '../../components/ui/avatar';
import { avatarPlaceholder } from '../../lib/placeholders';

type FormValues = {
  newMsg: string;
}

const messageSchema = yup.object().shape({
  newMsg: yup
    .string()
    .required('Message is required'),
});

const defaultValues = {
  newMsg: ""
};

const Messages = () => {

  //let [serverError, setServerError] = useState<string | null>(null);

  /*
  <li className="border-b-2 border-b-[#CCCCCC] py-3">
    <MessageCard
      key={1}
      ticket={{}}
      onClick={() => setTicket({})}
      isActive={true}
    />
  </li>
  <li className="border-b-2 border-b-[#CCCCCC] py-3">
    <MessageCard
      key={2}
      ticket={{}}
      onClick={() => setTicket({})}
      isActive={false}
    />
  </li>
  */

  const [openTab, setOpenTab] = React.useState(1);
  const [messageTab, setMessageTab] = React.useState(1);
  const [ticket, setTicket] = useState<any>({});
  const [tickets, setTickets] = useState([]);
  const [newTickets, setNewTickets] = useState([]);
  const [msgLoading, setMsgLoading] = useState(false);

  useEffect(() => {
    retrieveTickets();
    retrieveNewTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickets.length]);

  useEffect(() => {
    retrieveNewTickets();
  }, []);

  const {
    register,
    getValues,
    control,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(messageSchema),
  });

  const retrieveTickets = () => {
    SERVICES.get(`tickets/get`)
    .then(response => {
        const res = response.data.data;
        setTickets(res);
        if (tickets.length) {
          setTicket(tickets[0]);
        }
    })
    .catch(error => {
        const resError = error.response ? error.response.data.message : "Something went wrong please try again";
        console.log(resError);
        console.log(error.response.status);
        console.log(error.response.data.error);
    })

  }

  const retrieveNewTickets = () => {
    SERVICES.get('tickets/get/new')
    .then(response => {
        const res = response.data.data;
        setNewTickets(res);
    })
    .catch(error => {
        const resError = error.response ? error.response.data.message : "Something went wrong please try again";
        console.log(resError);
        console.log(error.response.status);
        console.log(error.response.data.error);
    })

  }

  const handleSendMesg = () => {

    const userid = localStorage.getItem('userid');
    const msg = getValues("newMsg");

    if(!msgLoading) {

      setMsgLoading(true);

      const obj = {
        ticketId: ticket?.id,
        adminId: userid,
        message: msg,
        senderType: 1
      };

      SERVICES.post(`message/create`, obj)
      .then(response => {
          const res = response.data;
          setMsgLoading(false);
          window.location.reload();
      })
      .catch(error => {
          setMsgLoading(false);
          const resError = error.response ? error.response.data.message : "Something went wrong please try again";
          console.log(resError);
          console.log(error.response.status);
          console.log(error.response.data.error);
      })

    }

  }

  return (
    <div className="flex flex-col w-full bg-[#FFFFFF] mt-10 pt-6 px-10 pb-10 h-full">
      {/*
        <div className="flex w-full items-center mb-4">
          <button className="relative h-7 w-7 flex justify-center items-center rounded-full hover:bg-gray-200 focus:bg-gray-200 mr-6">
            < className="w-6 h-6" />
          </button>
          <span className="text-body text-[28px] font-bold">Messages</span>
        </div>
      */}
      <div className="w-full h-full flex py-5">
        <div className="w-2/5 border-r-2 border-gray-100 pr-10 h-full">
          <span className="text-accent text-lg font-semibold">Tickets</span>
          <div className="w-full">
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
                    All Tickets
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
                     New
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
                     Open
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
                <li className="-mb-px mr-10 last:mr-0 text-center">
                  <a
                    className={
                      "text-xs font-semibold uppercase py-1 block leading-normal " +
                      (openTab === 4
                        ? "text-accent"
                        : "text-gray-200")
                    }
                    onClick={e => {
                      e.preventDefault();
                      setOpenTab(4);
                    }}
                    data-toggle="tab"
                    href="#link3"
                    role="tablist"
                  >
                     Closed
                  </a>
                  {
                    openTab === 4
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
            <div className="w-full py-3">
              <div className="w-full relative">
                <Input
                  name="search"
                  type="text"
                  variant="search"
                  placeholder="Search"
                  className="w-full"
                  dimension="small"
                />
                <SearchDarkIcon className="absolute right-2 top-[50%] -translate-y-[50%]"/>
              </div>
            </div>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6">
              <div className="py-5 flex-auto">
                <div className="tab-content tab-space">
                  <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                    <ul>
                      {tickets.map((_ticket: any, index: number) => (
                          <MessageCard
                            key={index}
                            ticket={_ticket}
                            onClick={() => setTicket(_ticket)}
                            isActive={ticket?.id === _ticket?.id}
                          />
                        ))}
                    </ul>
                  </div>
                  <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                    <ul>
                      {newTickets.map((_ticket: any, index: number) => (
                          <MessageCard
                            key={index}
                            ticket={_ticket}
                            onClick={() => setTicket(_ticket)}
                            isActive={ticket?.id === _ticket?.id}
                          />
                        ))}
                    </ul>
                  </div>
                  <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                    <ul>
                      {newTickets.map((_ticket: any, index: number) => (
                          <MessageCard
                            key={index}
                            ticket={_ticket}
                            onClick={() => setTicket(_ticket)}
                            isActive={ticket?.id === _ticket?.id}
                          />
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-3/5 px-10 h-full relative">
          {Object.keys(ticket).length > 0 ?
            <MessageUserTop
              ticket={ticket}
            />
            :
            null
          }
          <div className="w-full flex justify-center">
            <ul
              className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
              role="tablist"
            >
              <li className="-mb-px mr-10 last:mr-0 text-center">
                <a
                  className={
                    "text-xs font-semibold uppercase py-1 block leading-normal " +
                    (messageTab === 1
                      ? "text-accent"
                      : "text-gray-200")
                  }
                  onClick={e => {
                    e.preventDefault();
                    setMessageTab(1);
                  }}
                  data-toggle="tab"
                  href="#messageTab1"
                  role="tablist"
                >
                  Conversation
                </a>
                {
                  messageTab === 1
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
                    (messageTab === 2
                      ? "text-accent"
                      : "text-gray-200")
                  }
                  onClick={e => {
                    e.preventDefault();
                    setMessageTab(2);
                  }}
                  data-toggle="tab"
                  href="#messageTab2"
                  role="tablist"
                >
                   Profile
                </a>
                {
                  messageTab === 2
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
          <div className="w-full">
          {Object.keys(ticket).length > 0 ?
            <MessageGroup
              ticket={ticket}
            />
            :
            null
          }
          </div>
          <div className="w-full flex absolute bottom-0">
            <Input
              {...register('newMsg')}
              type="text"
              className="h-11 w-5/6"
              variant="outline"
              placeholder="Enter message"
              error={errors.newMsg?.message!}
            />
            <Button
              className="h-11 w-1/6 mr-10 ml-5"
              loading={msgLoading}
              disabled={msgLoading}
              onClick={handleSendMesg}
            >
              {msgLoading ? "Loading..." : "Send"}
            </Button>

          </div>
        </div>
      </div>
    </div>
  );

}

export default Messages;
