import DataTable, { TableColumn } from 'react-data-table-component';
import { MenuDotsIcon } from '../../components/icons/menu-dots';
import {
  DiscosType,
} from "../../ts-types/generated";

export type IProps = {
  discos?: any;
};


const DiscosTable = ({ discos }: IProps) => {

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

  let columns: TableColumn<DiscosType>[] = [
    {
      name: "NAME",
      id: "name",
      selector: row => row.name,
      sortable: true,
    },
    {
      name: "CONTACT",
      id: "contact",
      width: "150px",
      selector: row => row.contact,
      sortable: true,
    },
    {
      name: "EMAIL",
      id: "email",
      selector: row => row.email,
      sortable: true,
    },
    {
      name: "ADDRESS",
      id: "hqAddress",
      width: "300px",
      selector: row => row.hqAddress,
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
        data={discos}
        defaultSortFieldId={1}
        pagination
        customStyles={customStyles}
      />

);


}

export default DiscosTable;
