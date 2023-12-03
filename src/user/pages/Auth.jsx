import { React, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-date-picker";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-date-picker/dist/DatePicker.css";

import loginBg from "../../shared/images/login-bg.svg";
import FormInputElement from "../../shared/components/FormElements/FormInputElement";
import { AuthContext } from "../../shared/context/AuthContext";
import { FormContext } from "../../shared/context/FormContext";
import { useForm, Controller } from "react-hook-form";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import FormSelectElement from "../../shared/components/FormElements/FormSelectElement";

const Auth = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const formContext = useContext(FormContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { register, control, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const switchModeHandler = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (data) => {
    console.log(data);
    setIsLoading(true);
    if (isLoginMode) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/users/login",
          data
        );
        setIsLoading(false);

        const { userId, email, isAdmin, token, name } = response.data;
        auth.login(userId, email, isAdmin, token, name);
      } catch (err) {
        console.log(err);
        if (err.response) {
          console.log(err.response);
          setError(err.response.data.message);
          confirmAlert({
            title: "Error",
            message: err.response.data.message,
            buttons: [
              {
                label: "Ok",
              },
            ],
          });
        }
        setIsLoading(false);
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/users/signup",
          data
        );
        console.log(response.data);
        const { userId, email, isAdmin, token } = response.data;
        auth.login(userId, email, isAdmin, token);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        if (err.response) {
          console.log(err.response);
          setError(err.response.data.message);
          confirmAlert({
            title: "Error",
            message: err.response.data.message,
            buttons: [
              {
                label: "Ok",
              },
            ],
          });
        }

        setIsLoading(false);
      }
    }
  };

  const roles = formContext.roles;
  const divisions = formContext.divisions.filter((division) => {
    return (
      division === "Mekanik" ||
      division === "Kontrol" ||
      division === "Official"
    );
  });
  const generations = formContext.generations;

  return (
    <div className="h-screen flex flex-col items-center">
      <h1 className="text-4xl m-10">Absensi KRAI</h1>
      {isLoading && <LoadingSpinner color={"black"} loading={isLoading} />}
      <form
        className="flex flex-col items-center"
        onSubmit={handleSubmit((data) => authSubmitHandler(data))}
      >
        <div className="flex justify-center">
          <img src={loginBg} alt="login-bg" className="content-center" />
        </div>
        <h2 className="m-3 font-bold text-center">
          {isLoginMode ? "LOGIN TO YOUR ACCOUNT" : "MAKE A NEW ACCOUNT"}
        </h2>
        <FormInputElement
          label="Email"
          type="email"
          name="email"
          placeholder="Enter email"
          className="flex-1"
          register={register}
          required={true}
          withLabel={false}
        />
        <FormInputElement
          label="Password"
          type="password"
          name="password"
          placeholder="Enter password"
          className="flex-1"
          register={register}
          required={true}
          withLabel={false}
        />

        {!isLoginMode && (
          <>
            <FormInputElement
              label="Full Name"
              type="text"
              name="name"
              placeholder="Enter name"
              register={register}
              required={true}
              withLabel={false}
            />

            <FormSelectElement
              label="Role"
              name="role"
              register={register}
              optionList={roles}
              required={true}
              withLabel={false}
              className="flex-1 w-full"
              placeHolder="Select Role"
            />

            <FormSelectElement
              label="Division"
              name="division"
              register={register}
              optionList={divisions}
              required={true}
              withLabel={false}
              className="flex-1 w-full"
              placeHolder="Select Division"
            />

            <FormSelectElement
              label="Generation"
              name="generation"
              register={register}
              optionList={generations}
              required={true}
              withLabel={false}
              className="flex-1 w-full"
              placeHolder="Select Generation"
            />

            <div className="">
              <label>Tanggal lahir</label>
              <Controller
                name="dateOfBirth"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <DatePicker
                    className="l"
                    {...field}
                    placeHolderText="Select Date"
                    onChange={(date) => field.onChange(date)}
                    selected={field.value}
                  />
                )}
              />
            </div>
          </>
        )}
        <a
          href="#"
          className="font-bold text-gray-800 self-end"
          onClick={switchModeHandler}
        >
          {isLoginMode ? "Sign Up?" : "Log In?"}
        </a>
        <button
          type="submit"
          className="rounded-xl bg-blue-500 px-8 py-1.5 text-slate-100 mt-2"
        >
          {!isLoginMode ? "SIGN UP" : "LOG IN"}
        </button>
      </form>
    </div>
  );
};

export default Auth;
