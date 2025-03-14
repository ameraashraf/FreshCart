import Button from "../Button/Button";

function ProfileData({ handleOnClick }) {
  return (
    <div className="col-md-8">
      <div className="pt-md-2 pb-3 pb-md-5">
        <div className="textInfo mb-3">
          <h5 className="fw-bold">
            <i className="fa-solid fa-user me-2"></i>Name:
          </h5>
          <p className="mb-0">
            {localStorage.getItem("userName") || "Not provided"}
          </p>
        </div>
        <div className="textInfo mb-3">
          <h5 className="fw-bold">
            <i className="fa-solid fa-envelope me-2"></i>Email:
          </h5>
          <p className="mb-0">
            {localStorage.getItem("userEmail") || "Not provided"}
          </p>
        </div>
        <div className="textInfo mb-3">
          <h5 className="fw-bold">
            <i className="fa-solid fa-phone me-2"></i>Phone number:
          </h5>
          <p className="mb-0">01157611021</p>
        </div>

        <Button
          text={"Edit profile"}
          handleOnClick={handleOnClick}
          className={"bg-dark text-white"}
        />
      </div>
    </div>
  );
}

export default ProfileData;
