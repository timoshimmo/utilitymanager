import React, { useState } from 'react';
import { NotificationIcon } from '../../components/icons/notification-bell';
import TopMenu from './topmenu';
import Badge from '../../components/ui/badge';

const Topbar = () => {

  let title = '';

  if (typeof localStorage !== 'undefined') {
      const mTitle = localStorage.getItem('globalTitle');
      if(mTitle !== null) {
        title = mTitle;
      }
      else {
        title = 'Dashboard';
      }
  }

  let fullName = '';
  if (typeof localStorage !== 'undefined') {
      const user = localStorage.getItem('userFullName');
      if(user !== null) {
        fullName = user;
      }
  }



  return (
    <div className="w-full flex justify-between px-8">
      <span className="text-body font-bold text-[28px]">{title}</span>
      <div className="flex flex-end items-center">
        <button className="relative h-7 w-7 flex justify-center items-center rounded-full hover:bg-gray-200 focus:bg-gray-200">
          <NotificationIcon className="w-4 h-4 text-light" />
          <Badge
          className="inline-flex absolute bg-[#EF4444] top-0 right-0 border-2 border-white"
          />
        </button>
        <p className="mx-2 block text-[18px] text-[#D1D5DB]"> | </p>
        <TopMenu username={fullName} />
      </div>
    </div>
  );
};

export default Topbar;
