import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Input/Input";
import Button from "../Button/Button";
import styles from "./SignIn.module.css";
import { useDispatch } from "react-redux";
import {
  loginSuccess,
  setCurrentEmail,
  setCurrentName,
} from "../../store/user/user.reducer";

const SignIn: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  }, []);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    const newErrors = {
      email: !values.email ? "Required field" : "",
      password: !values.password ? "Required field" : "",
    };

    setErrors(newErrors);

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find((user: any) => user.email === values.email);

    if (!newErrors.email && !newErrors.password) {
      if (!foundUser) {
        setErrors({ email: "Can't find user", password: "" });
        return;
      }

      if (foundUser.password !== values.password) {
        setErrors({ email: "", password: "Wrong password" });
        return;
      }

      dispatch(loginSuccess(true));
      dispatch(setCurrentEmail(values.email));
      dispatch(setCurrentName(foundUser.username));
      navigate("/");
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form className={styles.form}>
      <Input
        ref={inputRef}
        label="Email"
        id="email"
        name="email"
        placeholder="Your email"
        value={values.email}
        error={!!errors.email}
        description={errors.email}
        type="text"
        onChange={handleChange}
      />
      <Input
        label="Password"
        id="password"
        name="password"
        placeholder="Your password"
        value={values.password}
        error={!!errors.password}
        description={errors.password}
        type="password"
        onChange={handleChange}
      />
      <Button
        type="button"
        onClick={handleSubmit}
        className={styles.btnSubmitSignIn}
      >
        {"Sign In"}
      </Button>
    </form>
  );
};

export default SignIn;
