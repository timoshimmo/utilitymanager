import React, { Fragment } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { CheckIcon } from '../../components/icons/check-icon';
import TrashIcon from '../../components/icons/trash-icon';
import {
  ItemsRequestType,
} from "../../ts-types/generated";
import { Menu, Transition } from '@headlessui/react';
import { ArrowDownIcon } from '../../components/icons/arrow-down';
import cn from 'classnames';
import { useModalAction } from "../ui/modal/modal.context";

export type IProps = {
  requests?: any;
};

/*
<button className="relative h-7 w-7 flex justify-center items-center rounded-full hover:bg-gray-200 focus:bg-gray-200">
  <MenuDotsIcon className="w-4 h-4" />
</button>

<Menu
    as="div"
    className="relative inline-block ltr:text-left rtl:text-right"
  >
    <Menu.Button className="flex items-center focus:outline-none">

      {({ open }) => (
          <MenuDotsIcon className="w-4 h-4" />
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
          'absolute mt-1 w-48 rounded shadow bg-accent shadow-700 focus:outline-none right-0 origin-top-right z-[1000]'
        )}
      >
        <Menu.Item key={1}>
              {({ active }) => (
                <li>
                  <button
                    onClick={() => handleUpdate(row._id)}
                    className={cn(
                      'block w-full py-2.5 px-6 text-sm font-semibold capitalize text-light transition duration-200 hover:text-gray-200 focus:outline-none ltr:text-left rtl:text-right',
                      active ? 'text-light' : 'text-light'
                    )}
                  >
                    Confirm
                  </button>
                </li>
              )}
        </Menu.Item>
    </Menu.Items>
  </Transition>
</Menu>
*/


const ItemsRequestTable = ({ requests }: IProps) => {

  const { openModal } = useModalAction();

  function handleUpdate(id: string, status: number) {
    openModal("CONFIRM_ITEM_REQUEST", { id, status });
  }

  function handleDelete(id: string) {
    const link = 'item-request/delete';
    openModal("DELETE_VIEW", { id, link });
  }

  const customStyles = {
    rows: {
        style: {
            color: '#131313',
            fontSize: 13
        },
    },
    headCells: {
        style: {
          color: '#131313',
          textTransform: 'uppercase',
          backgroundColor: 'rgba(26, 24, 117, 0.25)'
        },
    },
    cells: {
        style: {
          color: '#131313',
          fontSize: 13
        },
    },
};

  let columns: TableColumn<ItemsRequestType>[] = [
    {
      name: "PROJECT NAME",
      id: "name",
      selector: row => row.project,
      sortable: true,
      cell: (row) => {
          return <span className="whitespace-nowrap text-body">{row.project.title}</span>
      },
    },
    {
      name: "DESCRIPTION",
      id: "description",
      selector: row => row.project.description,
      cell: (row) => {
          return <span className="whitespace-nowrap text-body">{row.project.description}</span>
      },
    },
    {
      name: "TOTAL QTY",
      id: "totqty",
      selector: row => row.item,
      center: true,
      width: "150px",
      cell: (row) => {
          return <span className="whitespace-nowrap text-body">{row.item.quantity}</span>
      },
    },
    {
      name: "REQUEST QTY",
      id: "reqqty",
      center: true,
      selector: row => row.requestQty,
    },
    {
      name: "STATUS",
      id: "status",
      selector: row => row.status,
      cell: (row) => {
          if (row?.status === 0) {
            return <span className="whitespace-nowrap text-[#EA0E0E]">Pending</span>
          }
          else {
            return <span className="whitespace-nowrap text-[#27B235]">Confirmed</span>
          }
      },
    },
    {
      name: "",
      id: "_id",
      width: "60px",
      right: true,
      cell: row => (
        <div className="flex space-x-4">
          <button className="relative h-7 w-7 flex justify-center items-center rounded-full hover:bg-gray-200 focus:bg-transparent"
          onClick={()=>handleUpdate(row._id, row.status)}>
            <CheckIcon className="w-4 h-4" />
          </button>
          <button className="relative h-7 w-7 flex justify-center items-center rounded-full hover:bg-gray-200 focus:transparent"
          onClick={()=>handleDelete(row._id)}>
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ]

  return (
      <DataTable
        responsive={true}
        columns={columns}
        data={requests}
        defaultSortFieldId={1}
        pagination
        customStyles={customStyles}
      />

);


}

export default ItemsRequestTable;
