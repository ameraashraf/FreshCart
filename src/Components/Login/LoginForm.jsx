// LoginForm.js
import FormInput from "../FormInput/FormInput";
import styles from "../sharedStyles/loginAndRegister.module.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

function LoginForm(props) {
  //use navigate to navigate the user in case he is a new member
  const navigate = useNavigate();

  return (
    <div
      className={` my-5 shadow-lg rounded-3 pt-3 px-3 bg-white ${styles.loginContent} `}
    >
      {props.isSuccess && (
        <div className="  text-success text-center pt-2 pb-0  mt-0 mb-2">
          <h5>Welcome!</h5>
        </div>
      )}
      <h1 className="mb-4 text-center ">Sign in</h1>
      <form onSubmit={props.onSubmit}>
        <FormInput
          id="email"
          type="email"
          placeholder="Please write your email"
          value={props.values.email}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          error={props.errors.email}
          touched={props.touched.email}
        />

        <FormInput
          id="password"
          type="password"
          placeholder="Please write your password"
          value={props.values.password}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          error={props.errors.password}
          touched={props.touched.password}
        />

        {/*=======================================  */}
        <div className="pb-0 mb-0">
          {props.errorMessage && (
            <div className="  text-danger pt-0  mt-0 mb-2 ">
              {props.errorMessage}
            </div>
          )}
        </div>
        {/* ======================================= */}

        <Button
          isLoading={props.isLoading}
          text={"Login"}
          className="bg-dark text-white"
        />
        <div
          role="button"
          onClick={function () {
            navigate("/Register");
          }}
        >
          <p className="mt-2">
            New member? <span className="text-danger">Register</span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
