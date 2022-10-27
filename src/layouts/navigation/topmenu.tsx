import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useHistory } from 'react-router-dom';
import Avatar from '../../components/ui/avatar';
import cn from 'classnames';
import { globalSettings } from '../../settings/global';
import { avatarPlaceholder } from '../../lib/placeholders';
import { ArrowDownIcon } from '../../components/icons/arrow-down';

const TopMenu: React.FC<{ username?: string }> = ({ username }) => {

  const history = useHistory();

  function handleClick(path: string) {
    history.push(path);
  }

  return (

    <Menu
      as="div"
      className="relative inline-block ltr:text-left rtl:text-right"
    >
      <Menu.Button className="flex items-center focus:outline-none">

        {({ open }) => (
          <>
            <Avatar
              src={avatarPlaceholder}
              title="user name"
              className="h-7 w-7 mr-2"
            />
            <span className="mr-2 text-xs text-[#1F2937] font-semibold">{username}</span>
            <ArrowDownIcon
              className={cn('h-2 w-2', {
                'transform rotate-180': open,
              })}
            />
          </>
        )}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          as="ul"
          className={cn(
            'absolute mt-1 w-48 rounded bg-white pb-4 shadow-700 focus:outline-none right-0 origin-top-right z-[1000]'
          )}
        >
          {globalSettings.topmenuLinks.map(({ href, label }) => (
              <Menu.Item key={`${href}${label}`}>
                {({ active }) => (
                  <li>
                    <button
                      onClick={() => handleClick(href)}
                      className={cn(
                        'block w-full py-2.5 px-6 text-sm font-semibold capitalize text-heading transition duration-200 hover:text-accent focus:outline-none ltr:text-left rtl:text-right',
                        active ? 'text-accent' : 'text-body'
                      )}
                    >
                      {label}
                    </button>
                  </li>
                )}
              </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default TopMenu;
