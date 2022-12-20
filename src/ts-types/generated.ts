export declare type DiscosType = {
  _id: string;
  name: string;
  contact: string;
  email: string;
  hqAddress: string;
  createdDate: any;
};

export declare type AdminType = {
  _id: string;
  fullName: string;
  userName: string;
  email: string;
  mobileNo: string;
  permissionCode: string;
  createdDate: any;
};

export declare type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNo: string;
  createdDate: any;
};

export declare type AssetType = {
  _id: string;
  type: string;
  description: string;
  brand: string;
  status: any;
  value: number;
  createdDate: any;
};


export declare type TeamGroupType = {
  _id: string;
  name: string;
  branch: string;
  branchAddress: string;
  members: any;
  createdDate: any;
};

export declare type TeamMemberType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNo: string;
  branch: string;
  userType: string;
  createdDate: any;
};

export declare type TicketsType = {
  _id: string;
  title: string;
  description: string;
  status: any;
  location: string;
  user: any;
  disco: any;
  createdDate: any;
};

export declare type InventoryType = {
  _id: string;
  type: string;
  description: string;
  value: number;
  quantity: number;
  status: number;
  createdDate: any;
};

export declare type ProjectsType = {
  _id: string;
  title: string;
  description: string;
  location: string;
  group: any;
  equipments: any;
  status: number;
  createdDate: any;
};

export declare type ItemsRequestType = {
  _id: string;
  project: any;
  item: any;
  description: string;
  requestQty: number;
  status: number;
  createdDate: any;
};

export declare type Attachment = {
  thumbnail?: string;
  original?: string;
  id?: string;
};
