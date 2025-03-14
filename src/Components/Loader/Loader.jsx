import { FallingLines } from "react-loader-spinner";

function Loader() {
  return (
    <div className="d-flex justify-content-center align-items-center  vh-100">
      <FallingLines
        color="red" // Light color (light gray)
        width="80"
        visible={true}
        ariaLabel="Loading"
      />
    </div>
  );
}

export default Loader;
