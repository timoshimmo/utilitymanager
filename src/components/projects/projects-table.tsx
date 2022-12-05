import DataTable, { TableColumn } from 'react-data-table-component';
import { MenuDotsIcon } from '../../components/icons/menu-dots';
import {
  ProjectsType,
} from "../../ts-types/generated";

export type IProps = {
  projects?: any;
};


const ProjectsTable = ({ projects }: IProps) => {

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

  let columns: TableColumn<ProjectsType>[] = [
    {
      name: "TITLE",
      id: "title",
      selector: row => row.title,
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
      name: "TEAM",
      id: "group",
      selector: row => row.group,
      cell: (row) => {
          return <span className="whitespace-nowrap text-body">{row.group.name}</span>
      },
    },
    {
      name: "EQUIPMENTS",
      id: "equipments",
      selector: row => row.equipments,
      cell: (row) => {
          return <span className="whitespace-nowrap text-body">{row.equipments.length}</span>
      },
    },
    {
      name: "STATUS",
      id: "status",
      selector: row => row.status,
      cell: (row) => {
          if (row?.status === 0) {
            return <span className="whitespace-nowrap text-[#EA0E0E]">Pending</span>
          }
          else if(row?.status === 1) {
            return <span className="whitespace-nowrap text-[#FFA500]">In Progress</span>
          }
          else {
            return <span className="whitespace-nowrap text-[#27B235]">Completed</span>
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
        data={projects}
        defaultSortFieldId={1}
        pagination
        customStyles={customStyles}
      />

);


}

export default ProjectsTable;
