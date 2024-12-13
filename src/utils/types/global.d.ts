// declare module 'Foo' {
//     // Some variable declarations
//     export type Bar = string | number; /*sample*/
// }
export interface Style {}

export type BaseEntity = {
  id: string;
  createdAt: number;
};

export type Address = {
  uuid?: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  addressTitle: string;
  phoneNumber: string;
  faxNumber: string;
};

export type UserType = "doctor" | "patient" | "staff";
export type DoctorType = "MD" | "OD";

export type User = {
  id: number;
  uuid: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  dob: string;
  phoneNumber: string;
  gender: string;
  userType: UserType;
  profileImage: string | null;
  status: boolean;
  isVerified: boolean;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  doctorType: DoctorType;
  role: "ADMIN" | "USER";
  location: string;
  addresses: Address[];
  hasAddress: boolean;
  userId: number;
  staffSelectedDoctorId?: number;
} & BaseEntity;

export interface APIResponse {
  status: number;
  message: string;
  data: any;
}

export interface TableActionsMethod {
  action: string;
  data: any;
}

export type bookingStatusType =
  | "pending"
  | "scheduled"
  | "cancelled"
  | "completed";

export type ParamsType = {
  search?: string;
  sort?: string;
  order?: string;
  page?: number;
  limit?: number;
  statusType?: bookingStatusType[];
  isDashboard?: boolean;
};

export interface Note {
  id?: number;
  uuid?: string;
  title: string;
  consultNotes: string;
  status?: boolean;
  deletedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  patientId?: number;
  ConsultNoteDocuments?: {
    id: number;
    documentUrl: string;
    name: string;
    size: string;
  }[];
}

export interface ChatMessage {
  id?: number;
  uuid?: string;
  message: string;
  senderId: number;
  roomId: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export type Insurances = {
  id: string;
  companyName: string;
  phoneNumber: string;
};

export type DoctorInsurancesData = {
  insuranceIds: number[]; // Expecting an array of insurance IDs
};

export interface Notification {
  id?: number;
  uuid?: number;
  title: string;
  message: string;
  notificationType: string;
  isRead: boolean;
  status: boolean;
  deletedAt?: string;
  createdAt?: string;
}

export interface AddStaffData {
  id?: number;
  uuid?: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
}

export interface getStaff {
  page: number;
  pageSize: number;
}

export type DoctorStaffData = {
  staffIds: number[]; // Expecting an array of staff IDs
};

export type Staff = {
  id?: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
};

export type DoctorDetailData = {
  id?: number;
};
