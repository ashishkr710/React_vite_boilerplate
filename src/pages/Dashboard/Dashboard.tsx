import React, { useState } from "react";
import "./style.css";
import diversity from "@images/diversity_2.svg";
import patient from "@images/card-patient.svg";
import doctor from "@images/card-doctor.png";
import CustomTable from "@components/Common/table/CustomTable";
import { Add as AddIcon } from "@mui/icons-material";
import { TableDataFields, TableHeadCells } from "./constant";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContextProvider";
import Button from "@components/Common/Button";
import { defaultParams } from "@utils/global.constants";
import { useModalDisclosure } from "@hooks/useDisclosure";
import { TableActionsMethod } from "@typing/global";
import dayjs from "dayjs";
import {
  useDoctorsCount,
  useReferralCompletedCount,
  useReferralPlacedCount,
} from "../../API/Dashboard";
import ConfirmMsg from "@components/Common/ConfirmDialog";
import { decryptData } from "@utils/EncryptDecrypt/EncryptDecrypt";

function Dashboard() {
  const navigate = useNavigate();
  const {
    value: { user },
  } = useAppContext();
  const IsOD = user?.doctorType === "OD";
  const [params, setParams] = useState(defaultParams);

  // Fetching doctor count data
  const { data: doctorCountData } = useDoctorsCount({});
  const [doctorCount, lastDoctorUpdated] = doctorCountData
    ? [
        doctorCountData.doctorsCount,
        dayjs(doctorCountData.lastUpdated).format("MMM DD"),
      ]
    : [0, ""];

  // Fetching referral placed count data
  const { data: referralPlacedCountData } = useReferralPlacedCount({});
  const [referralPlacedCount, lastReferralPlacedUpdated] =
    referralPlacedCountData
      ? [
          referralPlacedCountData.referralsPlacedCount,
          dayjs(referralPlacedCountData.lastUpdated).format("MMM DD"),
        ]
      : [0, ""];

  // Fetching referral completed count data
  const { data: referralCompletedCountData } = useReferralCompletedCount({});
  const [referralCompletedCount, lastReferralCompletedUpdated] =
    referralCompletedCountData
      ? [
          referralCompletedCountData.referralsCompletedCount,
          dayjs(referralCompletedCountData.lastUpdated).format("MMM DD"),
        ]
      : [0, ""];

  const IsMD = user?.doctorType === "MD";
  const { isOpen, close, open, data: consultNoteData } = useModalDisclosure();
  const confirmModal = useModalDisclosure();

  const handleTableActions = ({ action, data }: TableActionsMethod) => {
    switch (action) {
      case "consultNote":
        open(data);
        break;
      case "isSeen":
        confirmModal?.open(data);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <ConfirmMsg
        open={confirmModal.isOpen}
        title={"Warning"}
        message={
          <div>
            Are you sure, want to move{" "}
            <b style={{ textTransform: "capitalize" }}>
              {decryptData(confirmModal.data?.fullName)}
            </b>{" "}
            from dashboard to the patient listing?
          </div>
        }
        showEntryName={false}
        onConfirm={()=>{}}
        onDismiss={confirmModal.close}
        actionBtnTitle="Confirm"
      />
      <div className="main-dashboard-div">
        <div className="dashboard-wrapper">
          <div className="heading-dashboard">
            <h2>Dashboard</h2>
          </div>
          <div className="outer-wrapper-cards">
            <div
              className="dashboard-cards"
              onClick={() => navigate("/app/patient")}
            >
              <div className="margin-bottom">
                <p>Referrals {IsMD ? "Received" : "Placed"}</p>
              </div>
              <div className="referral-div">
                <img src={diversity} alt="profile" className="diversity-img" />
                <h4>{referralPlacedCount}</h4>
              </div>
              <div className="card-content">
                <h6>Last update: {lastReferralPlacedUpdated}</h6>
              </div>
            </div>
            <div
              className="dashboard-cards"
              onClick={() =>
                navigate("/app/patient", {
                  state: { statusType: ["completed"] },
                })
              }
            >
              <div className="margin-bottom">
                <p>Referrals Completed</p>
              </div>
              <div className="referral-div">
                <img src={patient} alt="profile" className="diversity-img" />
                <h4>{referralCompletedCount}</h4>
              </div>
              <div className="card-content">
                <h6>Last update: {lastReferralCompletedUpdated}</h6>
              </div>
            </div>
            <div
              className="dashboard-cards"
              onClick={() => navigate("/app/doctor")}
            >
              <div className="margin-bottom">
                <p>{IsMD ? "OD/MD" : "MD"}</p>
              </div>
              <div className="referral-div">
                <img src={doctor} alt="profile" className="diversity-img" />
                <h4>{doctorCount}</h4>
              </div>
              <div className="card-content">
                <h6>Last update: {lastDoctorUpdated}</h6>
              </div>
            </div>
          </div>
          <div className="table-heading">
            <h2>Referrals Placed</h2>
            <Button
              startIcon={<AddIcon />}
              onClick={() =>
                navigate(IsMD ? "/app/add-appointment" : "/app/add-patient")
              }
            >
              {IsMD ? "Add Appointment" : "Add Referral Patient"}
            </Button>
          </div>

          <div>
            <CustomTable
              tableData={[]}
              headCells={TableHeadCells(IsOD, user?.userType)}
              dataFields={TableDataFields(IsOD, user?.userType)}
              canView={false}
              canDelete={false}
              canEdit={false}
              selectedUserAction={handleTableActions}
              loading={false}
              fetching={false}
              totalPages={0}
              currentPage={0}
              hidePagination
              handleSort={(sortKeyOrder) => {
                setParams({ ...params, ...sortKeyOrder });
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
