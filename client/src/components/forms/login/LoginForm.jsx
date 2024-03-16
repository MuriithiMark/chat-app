import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "./login-form.scss";
import { useDispatch } from "react-redux";
import useFormState from "../../../hooks/use-form-state";
import { useLoginUserMutation } from "../../../features/api";
import LoadingOverlay from "../../loading/LoadingOverlay";
import { onLogin } from "../../../features/auth/auth.slice";

const LoginForm = () => {
  const [formData, handleChange] = useFormState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginUser, result] = useLoginUserMutation();

  const handleSubmit = async () => {
    loginUser(formData)
      .unwrap()
      .then((data) => {
        dispatch(onLogin(data))
        result.reset()
        return navigate("/");
      })
      .catch((error) => {
        console.error("rejected ", error);
      });
  };


  return (
    <LoadingOverlay
      isLoading={result.isLoading}
      loadingComponent={<span>Loading ...</span>}
      loadingStyles="loading-styles"
    >
      <form>
        <label>
          Username
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="jane.doe"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder=""
          />
        </label>

        <br />

        <button className="submit-btn" type="button" onClick={handleSubmit}>
          Login
        </button>
        <span>
          Don't have an account? <Link to="/auth/sign-up">Sign Up</Link>
        </span>
      </form>
    </LoadingOverlay>
  );
};

export default LoginForm;