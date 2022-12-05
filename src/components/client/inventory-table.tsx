import DataTable, { TableColumn } from 'react-data-table-component';
import { MenuDotsIcon } from '../../components/icons/menu-dots';
import {
  InventoryType,
} from "../../ts-types/generated";

export type IProps = {
  inventory?: any;
};


const InventoryTable = ({ inventory }: IProps) => {

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

  let columns: TableColumn<InventoryType>[] = [
    {
      name: "NAME",
      id: "type",
      selector: row => row.type,
    },
    {
      name: "DESCRIPTION",
      id: "description",
      selector: row => row.description,
    },
    {
      name: "COST",
      id: "value",
      selector: row => row.value,
    },
    {
      name: "QUANTITY",
      id: "quantity",
      selector: row => row.quantity,
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
        data={inventory}
        defaultSortFieldId={1}
        pagination
        customStyles={customStyles}
      />

);


}

export default InventoryTable;
