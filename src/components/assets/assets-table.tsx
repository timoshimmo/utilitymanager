import DataTable, { TableColumn } from 'react-data-table-component';
import { MenuDotsIcon } from '../../components/icons/menu-dots';
import {
  AssetType,
} from "../../ts-types/generated";

export type IProps = {
  assets?: any;
  loading?: boolean;
};


const AssetsTable = ({ assets, loading }: IProps) => {

  const customStyles = {
    rows: {
        style: {
            color: '#131313',
            fontSize: 13,
            textTransform: 'capitalize',
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

  let columns: TableColumn<AssetType>[] = [
    {
      name: "TYPE",
      id: "type",
      selector: row => row.type,
      sortable: true,
    },
    {
      name: "DESCRIPTION",
      id: "description",
      selector: row => row.description,
    },
    {
      name: "LOCATION",
      id: "location",
      selector: row => row.location,
    },
    {
      name: "VALUE",
      id: "value",
      selector: row => row.value,
      sortable: true,
    },
    {
      name: "STATUS",
      id: "status",
      selector: row => row.status,
      cell: (row) => {
          if (row?.status > 0) {
            return <span className="whitespace-nowrap text-[#27B235]">Active</span>
          }
          else{
            return <span className="whitespace-nowrap text-[#EA0E0E]">In-Active</span>
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
        data={assets}
        defaultSortFieldId={1}
        progressPending={loading}
        pagination
        customStyles={customStyles}
      />

);


}

export default AssetsTable;
