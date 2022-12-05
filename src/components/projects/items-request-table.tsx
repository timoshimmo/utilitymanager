import DataTable, { TableColumn } from 'react-data-table-component';
import { MenuDotsIcon } from '../../components/icons/menu-dots';
import {
  ItemsRequestType,
} from "../../ts-types/generated";

export type IProps = {
  requests?: any;
};


const ItemsRequestTable = ({ requests }: IProps) => {

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
        data={requests}
        defaultSortFieldId={1}
        pagination
        customStyles={customStyles}
      />

);


}

export default ItemsRequestTable;
