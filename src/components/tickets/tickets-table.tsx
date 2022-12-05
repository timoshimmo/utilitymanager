import DataTable, { TableColumn } from 'react-data-table-component';
import { useHistory } from 'react-router-dom';
import { MenuDotsIcon } from '../../components/icons/menu-dots';
import {
  TicketsType,
} from "../../ts-types/generated";
import moment from 'moment';
import { ROUTES } from '../../lib/route-links';

export type IProps = {
  tickets?: any;
};


const TicketsTable = ({ tickets }: IProps) => {

  const history = useHistory();

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

  let columns: TableColumn<TicketsType>[] = [
    {
      name: "NAME",
      id: "name",
      width: "150px",
      selector: row => row.user,
      cell: row => (
        <div className="flex">
          <span className="whitespace-nowrap text-xs text-body uppercase mr-1">{row.user.firstName}</span>
          <span className="whitespace-nowrap text-xs text-body uppercase">{row.user.lastName}</span>
        </div>
      ),
    },
    {
      name: "CONTACT",
      id: "contact",
      selector: row => row.user,
      cell: row => (
        <div>
          <span className="whitespace-nowrap text-sm text-body">{row.user.email}</span>
          <span className="whitespace-nowrap text-xs text-muted">{row.user.mobileNo}</span>
        </div>
      ),
    },
    {
      name: "DESCRIPTION",
      id: "description",
      width: "300px",
      selector: row => row.description,
    },
    {
      name: "STATUS",
      id: "status",
      width: "100px",
      selector: row => row.status,
      cell: (row) => {
          if (row?.status === 0) {
            return <span className="whitespace-nowrap text-[#EA0E0E]">NEW</span>
          }
          else if(row?.status === 1){
            return <span className="whitespace-nowrap text-accent">OPEN</span>
          }
          else {
            return <span className="whitespace-nowrap text-[#27B235]">CLOSED</span>
          }
      },
    },
    {
      name: "PROVIDER",
      id: "provider",
      selector: row => row.disco.name,
    },
    {
      name: "DATE",
      id: "date",
      selector: row => row.createdDate,
      cell: (row) => (
        <span className="whitespace-nowrap text-body">{moment(row.createdDate).format('DD MMMM, YYYY @ hh:mm:ss A')}</span>
      ),
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
  ];

  const handleRowClicked = (row: any) => {
    history.push({
      pathname: `${ROUTES.TICKET_MESSAGES}`,
      state:{ obj: row }
    });
  }

  return (
      <DataTable
        responsive={true}
        columns={columns}
        data={tickets}
        defaultSortFieldId={1}
        pagination
        customStyles={customStyles}
        highlightOnHover
		    pointerOnHover
        onRowClicked={handleRowClicked}
      />

);


}

export default TicketsTable;
