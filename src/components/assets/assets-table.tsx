import DataTable, { TableColumn } from 'react-data-table-component';
import { MenuDotsIcon } from '../../components/icons/menu-dots';
import {
  AssetType,
} from "../../ts-types/generated";
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../lib/route-links';

export type IProps = {
  assets?: any;
  loading?: boolean;
};


const AssetsTable = ({ assets, loading }: IProps) => {

  const history = useHistory();

  const navDetails = (row: any) => {
      history.push(ROUTES.ASSET_DETAILS, { state: row });
  }

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
      name: "BRAND",
      id: "brand",
      selector: row => row.brand,
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
          if (row?.status === 0) {
            return <span className="whitespace-nowrap text-[#27B235]">Very Good</span>
          }
          else if (row?.status === 1){
            return <span className="whitespace-nowrap text-[#27B235]">Good</span>
          }
          else if (row?.status === 2){
            return <span className="whitespace-nowrap text-[#FFA500]">Operational</span>
          }
          else if (row?.status === 3){
            return <span className="whitespace-nowrap text-[#EA0E0E]">Poor</span>
          }
          else{
            return <span className="whitespace-nowrap text-[#EA0E0E]">Damaged</span>
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
        highlightOnHover
		    pointerOnHover
        customStyles={customStyles}
        onRowClicked={navDetails}
      />

);


}

export default AssetsTable;
