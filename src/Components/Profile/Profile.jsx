import { useContext, useState } from "react";
import { authContext } from "../Context/AuthContextProvider";
import { Helmet } from "react-helmet-async";
import styles from "./Profile.module.css";
import Loader from "../Loader/Loader";
import ProfileData from "../ProfileData/ProfileData";
import EditProfileData from "../EditProfileData/EditProfileData";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  if (!localStorage.getItem("userName") && !localStorage.getItem("userEmail")) {
    return <Loader />;
  }

  function handleOnClick() {
    setIsEditing(!isEditing);
  }

  return (
    <>
      <Helmet>
        <title>Profile - FreshCart</title>
        <meta
          name="description"
          content="Manage your personal information, view your order history, and update your preferences on your profile at FreshCart."
        />
      </Helmet>

      <div className="container py-5">
        <h1 className="text-center mb-4  text-uppercase">your Profile</h1>

        <div className="row justify-content-center pb-md-5">
          <div className="col-12 col-md-10 col-lg-8">
            <div className={`card p-4 ${styles.profileCard}`}>
              <div className="row gy-4">
                {/* Profile Picture */}
                <div className="col-md-4  d-flex justify-content-center align-items-center">
                  <div className="position-relative">
                    <img
                      className={`rounded-circle ${styles.userImg}`}
                      src={require("./userImage.jpg")}
                      alt="profile-picture"
                    />
                    <i
                      className={`position-absolute bottom-0 end-0 bg-danger text-white p-2 rounded-circle fa-solid fa-pen-to-square ${styles.editIcon}`}
                    ></i>
                  </div>
                </div>

                {/* Profile Information */}

                {isEditing ? (
                  <EditProfileData handleOnClick={handleOnClick} />
                ) : (
                  <ProfileData handleOnClick={handleOnClick} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
