import React from 'react';
import { logoTextPlaceholder } from '../../lib/placeholders';
import SidebarNav from './sidebar-nav';
import { globalSettings } from '../../settings/global';


const Sidebar = () => {

  let dynamicMenu: any = [];
  let code = '';
  if (typeof localStorage !== 'undefined') {
      const mCode = localStorage.getItem('permissionCode');
      if(mCode !== null) {
        code = mCode;
      }
  }

  /*
  case "7":
    dynamicMenu = globalSettings.assetSideMenu;
    break;
  case "5":
    dynamicMenu = globalSettings.teamSideMenu;
    break;
  */

  switch (code) {
      case "1":
        dynamicMenu = globalSettings.superSideMenu;
        break;
      case "2":
        dynamicMenu = globalSettings.adminSideMenu;
        break;
      case "7":
        dynamicMenu = globalSettings.projectSideMenu;
        break;
      case "6":
        dynamicMenu = globalSettings.storeSideMenu;
        break;
  }

  return (
    <div className="w-full h-full px-4 flex flex-col">
      <div className="flex justify-center items-center h-20 mt-2">
        <img
            alt="Logo"
            src={logoTextPlaceholder}
            height="45"
            width="135"
          />
      </div>
      <hr className="opacity-60 mt-4 mb-8"/>
      <SidebarNav menus={dynamicMenu} />
    </div>
  );
};

export default Sidebar;
