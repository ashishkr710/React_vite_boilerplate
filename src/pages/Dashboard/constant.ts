import { UserType } from "@typing/global";

export const TableHeadCells = (IsOD: boolean, usertype: UserType) => {
  const list = [
    {
      id: "fullName",
      label: "Patient name",
      sort: true,
      nested: "fullName",
      isEncrypted: true,
      type: IsOD ? "text" : "linkToAppointment",
      style: { textWrap: "nowrap", textTransform: "capitalize" },
    },
    {
      id: "dob",
      label: "DOB",
      sort: true,
      type: "date",
      nested: "dob",
      isEncrypted: true,
      style: { textWrap: "nowrap" },
    },
    {
      id: "createdAt",
      sort: true,
      label: "Referred on",
      type: "date",
      nested: "createdAt",
    },
    {
      id: "referredDoctor",
      label: IsOD ? "Referred to" : "Referred by",
      nested: IsOD ? "referedTo.name" : "referedBy.name",
      sort: true,
      style: { textTransform: "capitalize", textWrap: "nowrap" },
    },
    {
      id: "consultationDate",
      label: "Consultation date",
      //sort: true,
      type: IsOD ? "date" : "appointmentdate",
      nested: "consultationAppointment.date",
    },
    {
      id: "surgeryDate",
      label: "Surgery date",
      //sort: true,
      type: IsOD ? "date" : "appointmentdate",
      nested: "surgeryAppointment.date",
    },
    {
      id: "bookingStatus",
      label: "Status",
      sort: true,
      nested: "bookingStatus",
      type: "status",
      style: { borderRadius: "4px" },
    },
    {
      id: "returnToReferrer",
      label: "Return to referrer",
      type: "boolean",
      nested: "consultReason.patientReturn",
    },
    {
      id: "hasConsultNote",
      label: "Consult note",
      type: "hasConsultNote",
      nested: "hasConsultNote",
    },
  ];
  if (usertype === "doctor")
    list.push({
      id: "directMessage",
      label: "Direct messege",
      type: "linkToChat",
      nested: "directMessage",
    });
  if (usertype === "doctor" && IsOD)
    list.push({
      id: "isSeen",
      label: "Seen",
      type: "isSeen",
      nested: "consultReason.patientReturn",
    });

  return list;
};

export const TableDataFields = (IsOD: boolean, usertype: UserType) => {
  const list = [
    "fullName",
    "dob",
    "createdAt",
    "referredDoctor",
    "consultationDate",
    "surgeryDate",
    "bookingStatus",
    "returnToReferrer",
    "hasConsultNote",
  ];
  if (usertype === "doctor") list.push("directMessage");
  if (usertype === "doctor" && IsOD) list.push("isSeen");
  return list;
};

export const TableHeadCellsForMD = (IsOD: boolean) => [
  {
    id: "fullName",
    label: "Patient name",
    //sort: true,
    nested: "fullName",
    type: IsOD ? "text" : "linkToAppointment",
    style: { textWrap: "nowrap", textTransform: "capitalize" },
  },
  {
    id: "referedOn",
    label: "Referred on",
    type: "date",
    nested: "createdAt",
  },
  {
    id: "doctor",
    label: IsOD ? "Referred to" : "Referred by",
    nested: IsOD ? "referedTo.name" : "referedBy.name",
    style: { textTransform: "capitalize" },
  },
  {
    id: "appointmentType",
    label: "Appointment type",
    //sort: true,
    nested: "appointments.appointmentType",
    style: { borderRadius: "4px", textTransform: "capitalize" },
  },
  {
    id: "consultReason",
    label: "Consult reason",
    nested: "consultReason.reason",
    type: "status",
  },
  {
    id: "directMessage",
    label: "Direct messege",
    type: "linkToChat",
    nested: "directMessage",
  },
  {
    id: "bookingStatus",
    label: "Status",
    nested: "bookingStatus",
    type: "status",
  },
];

export const TableDataFieldsForMD = [
  "fullName",
  "referedOn",
  "doctor",
  "appointmentDate",
  "consultReason",
  "directMessage",
  "bookingStatus",
];
