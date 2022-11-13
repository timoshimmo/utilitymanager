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
  status: any;
  location: string;
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
