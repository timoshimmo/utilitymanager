import React from 'react';
import { NavLink as RouterLink, withRouter, RouteComponentProps, useHistory } from 'react-router-dom';
import { avatarPlaceholder } from '../../lib/placeholders';
import Avatar from '../../components/ui/avatar';
import Button from '../../components/ui/button';

type SidebarNavProps = {
  menus?: any;
};

const SidebarNav: React.FC<SidebarNavProps & RouteComponentProps> = ({menus}) => {

  const history = useHistory();

  let fullName = '';
  if (typeof localStorage !== 'undefined') {
      const user = localStorage.getItem('userFullName');
      if(user !== null) {
        fullName = user;
      }
  }

  const logOut = () => {
    history.push('/signin');
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('globalTitle');
    }
  }

  const handleChangeTitle = (title: string) => {
    localStorage.setItem('globalTitle', title);
  }

  return (
    <div className="w-full relative grow">
      <p className="text-xs text-[#FFFFFF] opacity-60 mb-4">MAIN</p>
      <div className="w-full overflow-hidden">
        <ul>
          {menus.map((item: any, idx:number) => (
            <li className="py-1" key={idx}>
              <RouterLink
                strict
                exact
                to={item.href}
                onClick={()=>handleChangeTitle(item.label)}
                className='flex border-l-4 border-transparent py-3 px-4 font-semibold text-sm text-light transition-colors hover:bg-accent-hover focus:bg-accent-hover'
                activeClassName="bg-accent-hover"
              >
                {item.icon && <img className="mr-4" src={item.icon}/>}
                {item.label}
              </RouterLink>
            </li>
          ))}
        </ul>
      </div>
      <Button
        className="bg-accent-hover text-xs rounded-none w-full absolute bottom-5 justify-start"
        onClick={logOut}
      >
        <Avatar
          src={avatarPlaceholder}
          title="user name"
          className="h-7 w-7 mr-2"
        />
        <div className="flex flex-col items-start">
          <p className="text-xs text-light font-semibold">{fullName}</p>
          <p className="text-[11px] text-light font-normal">Log Out</p>
        </div>
      </Button>
    </div>
  );
};

export default withRouter(SidebarNav);
