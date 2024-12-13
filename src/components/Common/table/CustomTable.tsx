import React from "react";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import {
  Skeleton,
  Tooltip,
  Table,
  TableContainer,
  Paper,
  TableBody,
  Button as MuiButton,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import dayjs from "dayjs";
import { Link, useLocation } from "react-router-dom";
import CustomPagination from "./CustomPagination";
import { CustomTableType, Order } from "./type";
import { fetchNestedValueByDotOperator } from "@utils/functions";
import { statusColor } from "@utils/global.constants";
import { bookingStatusType } from "@typing/global";
import ConfirmMsg from "../ConfirmDialog";
import { useModalDisclosure } from "@hooks/useDisclosure";
import { useAppContext } from "../../../contexts/AppContextProvider";
import { socket } from "@utils/socket/socket";
import { decryptData } from "@utils/EncryptDecrypt/EncryptDecrypt";

function EnhancedTableHead(props: {
  order: Order;
  orderBy: string;
  onRequestSort: any;
  headCells: any;
}) {
  const { order, orderBy, onRequestSort, headCells } = props;
  const createSortHandler = (property: string) => (event: any) => {
    onRequestSort(event, property);
  };

  const Icon = () => {
    return (
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "Center",
          alignItems: "Center",
          marginLeft: "5px",
        }}
      >
        <KeyboardArrowUp fontSize="inherit" />
        <KeyboardArrowDown fontSize="inherit" />
      </span>
    );
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell: any, index: number) => (
          <TableCell
            key={headCell?.id}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={
              headCell?.sort
                ? orderBy === headCell?.id
                  ? order
                  : false
                : false
            }
            style={{
              ...{
                pointerEvents: headCell?.sort ? "auto" : "none",
                textAlign: index === 0 ? "left" : "center",
                textWrap: "nowrap",
                padding: "14px 10px",
              },
              ...headCell?.headerStyle,
            }}
          >
            <TableSortLabel
              active={orderBy === headCell?.id}
              direction={
                headCell?.sort
                  ? orderBy === headCell?.id
                    ? order
                    : "asc"
                  : order
              }
              onClick={headCell?.sort ? createSortHandler(headCell?.id) : null}
              IconComponent={headCell?.sort ? Icon : null}
            >
              {headCell?.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function CustomTable({
  tableData,
  headCells,
  dataFields,
  selectedUserAction,
  loading,
  fetching,
  canView = true,
  canEdit = true,
  canDelete = true,
  hidePagination = false,
  currentPage,
  totalPages,
  handlePageChange,
  handleSort,
}: CustomTableType) {
  const {
    value: { user },
  } = useAppContext();
  const IsMD = user?.doctorType === "MD";
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<string>(headCells[0]?.id);
  const { isOpen, open, close, data: deleteEntry } = useModalDisclosure();
  const location = useLocation();
  const pathname = location?.pathname;

  const handleRequestSort = (event: any, property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    handleSort({ sort: property, order: isAsc ? "DESC" : "ASC" });
  };

  const column = (data: any, index: number) => {
    let value = fetchNestedValueByDotOperator(data, headCells[index]?.nested);
    if (headCells[index]?.isEncrypted) {
      value = decryptData(value);
    }
    switch (headCells[index]?.type) {
      case "date":
        return value ? dayjs(value).format("MM-DD-YYYY") : "-";
      case "dateTime":
        return value ? dayjs(value).format("MM-DD-YYYY, HH:mm A") : "-";
      case "boolean":
        return value ? "Yes" : "No";
      case "number":
        return value || 0;
      case "appointmentdate":
        return value ? (
          <span
            onClick={() =>
              selectedUserAction({
                action: "consultNote",
                data: {
                  ...data,
                  appointmentType:
                    headCells[index]?.id === "consultationDate"
                      ? "Consultation"
                      : "Surgery",
                },
              })
            }
            style={{
              textDecoration: "underline",
              color: "#1976d2",
              cursor: "pointer",
            }}
          >
            {dayjs(value).format("MM-DD-YYYY")}
          </span>
        ) : (
          "-"
        );
      case "linkToChat":
        return (
          <Link
            to={`/app/chat`}
            onClick={() =>
              socket.emit("joinRoom", {
                referedBy: data?.referedBy?.doctorId,
                referedTo: data?.referedTo?.doctorId,
                patientId: data?.patientId,
              })
            }
            state={{
              referedBy: data?.referedBy?.doctorId,
              referedTo: data?.referedTo?.doctorId,
              patientId: data?.patientId,
              patientName: data?.fullName,
              doctorName: IsMD ? data?.referedBy?.name : data?.referedTo?.name,
            }}
            style={{
              textDecoration: "underline",
              color: "#2E71F4",
            }}
          >
            Link
          </Link>
        );
      case "linkToAppointment":
        return data?.bookingStatus !== "completed" ? (
          <Link
            to={`/app/add-appointment`}
            state={{ patientUserId: data?.id }}
            style={{
              textDecoration: "underline",
              color: "#2E71F4",
            }}
          >
            {value || "-"}
          </Link>
        ) : (
          value
        );
      case "status":
        return (
          <div
            style={{
              padding: "6px 14px",
              textTransform: "capitalize",
              borderRadius: "4px",
              background: statusColor[value as bookingStatusType],
            }}
          >
            {value || "-"}
          </div>
        );
      case "hasConsultNote":
        return (
          <Link
            to={`/app/consult-note`}
            state={data}
            style={{
              textDecoration: "underline",
              color: "#2E71F4",
              cursor: "pointer",
            }}
          >
            {value ? "Yes" : "No"}
          </Link>
        );
      case "cancelBtn":
        return (
          <>
            {value !== "cancelled" && value !== "completed" ? (
              <MuiButton
                sx={{
                  margin: "auto",
                }}
                color="error"
                onClick={() =>
                  selectedUserAction({
                    action: "cancel",
                    data,
                  })
                }
              >
                Cancel
              </MuiButton>
            ) : (
              "-"
            )}
          </>
        );
      case "completeBtn":
        return (
          <>
            {value !== "cancelled" && value !== "completed" ? (
              <MuiButton
                sx={{
                  margin: "auto",
                }}
                color="success"
                onClick={() =>
                  selectedUserAction({
                    action: "complete",
                    data,
                  })
                }
              >
                Complete
              </MuiButton>
            ) : (
              "-"
            )}
          </>
        );
      case "isSeen":
        return data?.bookingStatus === "completed" ? (
          <MuiButton
            sx={{
              margin: "auto",
            }}
            color="success"
            onClick={() =>
              selectedUserAction({
                action: "isSeen",
                data,
              })
            }
          >
            Seen
          </MuiButton>
        ) : (
          <></>
        );
      default: // for Text type
        return value || "-";
    }
  };

  const checkAccess = (rowData: any) => {
    if (pathname === "/app/patient") {
      return rowData.bookingStatus === "pending";
    }
    if (pathname === "/app/appointment") {
      return (
        rowData.appointmentStatus !== "cancelled" &&
        rowData.appointmentStatus !== "completed"
      );
    }
    return true;
  };

  return (
    <>
      <ConfirmMsg
        open={isOpen}
        title={"Delete"}
        message={"Are you sure, want to delete"}
        entryName={""}
        onConfirm={() => {
          selectedUserAction({
            action: "delete",
            data: deleteEntry,
          });
          close();
        }}
        onDismiss={close}
        actionBtnTitle="Delete"
      />
      <div className="table-wrap">
        <TableContainer component={Paper}>
          <Table
            sx={{
              minWidth: "650",
              width: "100%",
              backgroundColor: "var(--light-color)",
              textAlign: "center",
              borderRadius: "4px",
              borderCollapse: "collapse",
              marginBottom: "20px",
            }}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headCells={headCells}
            />
            <TableBody>
              {loading || fetching ? (
                Array.from(new Array(10)).map((val, index) => (
                  <TableRow key={index}>
                    {dataFields?.map((data: string, index: number) => (
                      <TableCell key={index}>
                        <Skeleton animation="wave" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : tableData.length > 0 ? (
                tableData?.map((row: any) => {
                  const hasAccess = checkAccess(row);

                  return (
                    <TableRow key={row?.id}>
                      {dataFields?.map((fieldName: string, index: number) => {
                        return (
                          <TableCell
                            className={headCells?.[index]?.className}
                            key={fieldName}
                            style={{
                              padding: "14px 10px",
                              color: "var(--heading-color)",
                              textAlign: index === 0 ? "left" : "center",
                              // borderBottom:
                              //     '1px solid var(--border-color)',
                              ...headCells?.[index]?.style,
                            }}
                          >
                            {fieldName !== "actions" ? (
                              column(row, index)
                            ) : (
                              <div className="action-wrap">
                                {canView ? (
                                  <Tooltip title="View">
                                    <div
                                      onClick={() =>
                                        selectedUserAction({
                                          action: "view",
                                          data: row,
                                        })
                                      }
                                      className="view-btn"
                                    >
                                      <VisibilityIcon />
                                    </div>
                                  </Tooltip>
                                ) : null}
                                {canEdit ? (
                                  <Tooltip
                                    title={
                                      hasAccess
                                        ? pathname === "/app/appointment"
                                          ? "Edit/Reschedule"
                                          : "Edit"
                                        : "You dont have permission"
                                    }
                                  >
                                    <div
                                      onClick={() =>
                                        hasAccess &&
                                        selectedUserAction({
                                          action: "edit",
                                          data: row,
                                        })
                                      }
                                      className="edit-btn"
                                      style={{
                                        opacity: hasAccess ? "1" : "0.2",
                                      }}
                                    >
                                      <EditIcon />
                                    </div>
                                  </Tooltip>
                                ) : null}
                                {canDelete ? (
                                  <Tooltip
                                    title={
                                      hasAccess
                                        ? "Delete"
                                        : "You dont have permission"
                                    }
                                  >
                                    <div
                                      className="delete-btn"
                                      onClick={() => hasAccess && open(row)}
                                      style={{
                                        opacity: hasAccess ? "1" : "0.2",
                                      }}
                                    >
                                      <DeleteIcon />
                                    </div>
                                  </Tooltip>
                                ) : null}
                              </div>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow className="cell-div">
                  <TableCell
                    colSpan={dataFields.length}
                    style={{ textAlign: "center" }}
                  >
                    No Data Available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {hidePagination || totalPages <= 1 ? null : (
        <CustomPagination
          totalPages={totalPages}
          page={currentPage}
          handlePage={handlePageChange}
        />
      )}
    </>
  );
}
