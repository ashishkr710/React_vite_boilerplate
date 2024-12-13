import React, { useEffect, useState } from "react";
import "../Profile/style.css";
import "./style.css";
import NoImage from "@images/no-image.png";
import cameraimg from "@images/camera-img.svg";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAppContext } from "../../contexts/AppContextProvider";
import { useModalDisclosure } from "@hooks/useDisclosure";
import EditProfileModal from "./EditProfileModal";
import { Address } from "@typing/global";
import { useNavigate } from "react-router-dom";
import { uploadProfileImage } from "../../API/User";
import { failed } from "@components/Common/Toastify";
import storage from "@utils/storage";

function Profile() {
 const { value, setValue, handleLoading } = useAppContext();
 const navigate = useNavigate();

 const profileModal = useModalDisclosure();

 const addressModal = useModalDisclosure(value?.user?.doctorType === "MD" && !value?.user?.hasAddress);
 const insuranceModal = useModalDisclosure();
 const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
 });

 const [profileImage, setProfileImage] = useState<string | null>(value?.user?.profileImage || null);

 useEffect(() => {
  if (value?.user?.userType !== "doctor") {
   navigate("/app/dashboard");
  }
 }, []);

 // Handle image upload
 const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.files && event.target.files[0]) {
   handleLoading(true);
   const formData = new FormData();
   formData.append("profileImage", event.target.files[0]);
   uploadProfileImage(formData)
    .then((res: any) => {
     setValue({
      ...value,
      user: {
       ...value.user,
       profileImage: URL.createObjectURL(event.target.files[0]),
      },
     });
     storage.setUser({
      ...value.user,
      profileImage: res?.data?.data?.profileImage,
     });
     setProfileImage(URL.createObjectURL(event.target.files[0]));
    })
    .catch(() => failed("Image upload failed"))
    .finally(() => handleLoading(false));
  }
 };

 const capitalizeFirstLetter = (str: any) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
 };

 return (
  <>
   <div className="main-view-div">
    <div className="view-heading add-staff-row">
     <div>
      <h4>Profile</h4>
     </div>
    </div>

    <div className="view-details">
     <div className="doctor-profile-div">
      <div className="profle-wrapper">
       <div className="inner-upload-profile">
        {profileImage ? <img className="fixed-image" src={profileImage} alt="profile-img" /> : <img className="fixed-image" src={NoImage} alt="profile-img" />}
        <div>
         <Button component="label" role={undefined} variant="contained" tabIndex={-1} className="profile-upload-btn" startIcon={<img src={cameraimg} alt="profile-img" />}>
          <VisuallyHiddenInput type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleProfileImageChange} />
         </Button>
        </div>
       </div>

       <div>
        <h6 style={{ textTransform: "capitalize" }}>{value?.user?.fullName}</h6>
        {/*<p>Dermatologist</p>*/}
       </div>
      </div>
      <div className="profile-edit-btn">
       <Button className="edit-btn" onClick={profileModal.open}>
        Edit Profile
       </Button>
      </div>
     </div>

     <div className="profile-inner-wrapper">
      <div className="profile-inputs">
       <div className="d-flex name-fields">
        <h4>Name : </h4>
        <p style={{ textTransform: "capitalize" }}>
         {value?.user?.firstName} {value?.user?.lastName}
        </p>
       </div>
       <div className="d-flex name-fields">
        <h4>Gender : </h4>
        <p style={{ textTransform: "capitalize" }}> {value?.user?.gender}</p>
       </div>
       {/* <div className="d-flex name-fields">
                            <h4>Specialty :</h4>
                            <p>Ophthalmologist</p>
                        </div> */}
      </div>
      <div className="profile-inputs">
       <div className="d-flex name-fields">
        <h4>Phone : </h4>
        <p>{value?.user?.phoneNumber}</p>
       </div>
       <div className="d-flex name-fields">
        <h4>Email : </h4>
        <p>{value?.user?.email}</p>
       </div>
       <div className="d-flex name-fields">
        {/* <a
                                    style={{
                                        textDecoration: 'none',
                                        color: 'blue',
                                    }}
                                >
                                    <h4 onClick={insuranceModal.open}>
                                        Insurances
                                    </h4>
                                </a> */}
       </div>
       {/*<div className="d-flex name-fields">
                                <h4>Location:</h4>
                                <p style={{ textTransform: 'capitalize' }}>
                                    {value?.user?.location}
                                </p>
                            </div>*/}
      </div>
      {value?.user?.doctorType === "MD" ? (
       <div className="profile-inputs">
        <div className="d-flex name-fields">
         <p className="insurance-link">
          <a
           onClick={insuranceModal.open}
           style={{
            textDecoration: "underline",
            cursor: "pointer",
           }}
          >
           Insurance Details{" "}
          </a>
         </p>
        </div>
       </div>
      ) : null}
     </div>

     <div className="profile-edit-btn" style={{ textAlign: "end", marginTop: "20px" }}>
      <Button className="edit-btn" onClick={addressModal.open}>
       Add Address
      </Button>
     </div>

     <div className="profile-inner-wrapper">
      <div className="address-inputs">
       <div className="address-fields">
        <h4>Address Information</h4>
       </div>
      </div>
     </div>
    </div>
   </div>
   {profileModal.isOpen ? <EditProfileModal isOpen={profileModal.isOpen} onClose={profileModal.close} /> : null}
  </>
 );
}

export default Profile;
