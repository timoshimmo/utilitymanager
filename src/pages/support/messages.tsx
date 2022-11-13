import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Alert from '../../components/ui/alert';
//import axios from 'axios';
import SERVICES from '../../util/webservices';
import { BackArrowIcon } from '../../components/icons/back-arrow';


const Messages = () => {

  //let [serverError, setServerError] = useState<string | null>(null);

  return (
    <div className="flex items-center flex-col w-full bg-[#FFFFFF] rounded mt-10 pt-6 px-20 pb-10">
      <div className="w-2/5">

      </div>
      <div className="w-3/5">

      </div>
    </div>
  );

}

export default Messages;
