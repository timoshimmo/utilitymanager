import React, { useState } from 'react';


const VerifyUser = () => {

  return (
      <div className="flex justify-center items-center w-full h-screen">
        <div className="flex items-center flex-col xs:w-5/6 w-2/5 bg-[#FFFFFF] shadow rounded-sm p-6">
          <img
            alt="Logo"
            src="/images/utility_manager_logo_main.png"
            height="80"
            width="80"
          />
            <h6 className="mt-8 text-dark text-sm w-80 text-center">Your account has been successfully registered!</h6>
            <span className="mt-2 text-[#888888] text-sm w-80 text-center">You can now use your credentials to login</span>
          </div>
        </div>
    );
}

export default VerifyUser;
