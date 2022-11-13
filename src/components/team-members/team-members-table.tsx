import DataTable, { TableColumn } from 'react-data-table-component';
import { MenuDotsIcon } from '../../components/icons/menu-dots';
import {
  TeamMemberType,
} from "../../ts-types/generated";

export type IProps = {
  members?: any;
};


const TeamMembersTable = ({ members }: IProps) => {

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

  let columns: TableColumn<TeamMemberType>[] = [
    {
      name: "FIRST NAME",
      id: "firstName",
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
    },
    {
      name: "MOBILE No.",
      id: "mobileNo",
      selector: row => row.mobileNo,
    },
    {
      name: "BRANCH",
      id: "branch",
      selector: row => row.branch,
    },
    {
      name: "ROLE",
      id: "userType",
      selector: row => row.userType,
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
        data={members}
        defaultSortFieldId={1}
        pagination
        customStyles={customStyles}
      />

);


}

export default TeamMembersTable;
