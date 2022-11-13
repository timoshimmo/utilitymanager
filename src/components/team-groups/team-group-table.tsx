import DataTable, { TableColumn } from 'react-data-table-component';
import { MenuDotsIcon } from '../../components/icons/menu-dots';
import {
  TeamGroupType,
} from "../../ts-types/generated";

export type IProps = {
  groups?: any;
};


const TeamGroupTable = ({ groups }: IProps) => {

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

  let columns: TableColumn<TeamGroupType>[] = [
    {
      name: "NAME",
      id: "name",
      selector: row => row.name,
      sortable: true,
    },
    {
      name: "BRANCH",
      id: "branch",
      selector: row => row.branch,
    },
    {
      name: "ADDRESS",
      id: "branchAddress",
      selector: row => row.branchAddress,
    },
    {
      name: "No. of MEMBERS",
      id: "members",
      center: true,
      selector: row => row.members.length,
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
        data={groups}
        defaultSortFieldId={1}
        pagination
        customStyles={customStyles}
      />

);


}

export default TeamGroupTable;
