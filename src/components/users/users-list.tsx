import DataTable, { TableColumn } from 'react-data-table-component';
import { MenuDotsIcon } from '../../components/icons/menu-dots';
import {
  UserType,
} from "../../ts-types/generated";

export type IProps = {
  users?: any;
};


const UsersList = ({ users }: IProps) => {

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

  let columns: TableColumn<UserType>[] = [
    {
      name: "FIRST NAME",
      id: "firstName",
      width: "200",
      selector: row => row.firstName,
      sortable: true,
    },
    {
      name: "LAST NAME",
      id: "lastName",
      selector: row => row.lastName,
      sortable: true,
    },
    {
      name: "EMAIL",
      id: "email",
      selector: row => row.email,
      sortable: true,
    },
    {
      name: "CONTACT",
      id: "mobileNo",
      selector: row => row.mobileNo,
      sortable: true,
    },
    {
      name: "",
      id: "_id",
      width: "60px",
      right: true,
      cell: row => (
        <button className="relative h-7 w-7 flex justify-center items-center rounded-full hover:bg-gray-200 focus:bg-gray-200">
          <MenuDotsIcon className="w-4 h-4" />
        </button>
      ),
    },
  ]

  return (
      <DataTable
        responsive={true}
        columns={columns}
        data={users}
        defaultSortFieldId={1}
        pagination
        customStyles={customStyles}
      />

);


}

export default UsersList;
