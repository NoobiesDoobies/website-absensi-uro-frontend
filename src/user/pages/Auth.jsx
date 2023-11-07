import { React, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-date-picker";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

import { AuthContext } from "../../shared/context/AuthContext";
import { useForm, Controller } from "react-hook-form";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import "../../shared/components/FormElements/Form.css";

const Auth = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const [isLoginMode, setIsLoginMode] = useState(true);
  const { register, control, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const switchModeHandler = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (data) => {
    setIsLoading(true);
    if (isLoginMode) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/users/login",
          data
        );
        setIsLoading(false);

        const { userId, email, isAdmin, token } = response.data;
        auth.login(userId, email, isAdmin, token);
      } catch (err) {
        console.log(err);
        if (err.response) {
          console.log(err.response);
          setError(err.response.data.message);
          alert(err.response.data.message);
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
          alert(err.response.data.message);
        }

        setIsLoading(false);
      }
    }
  };

  const roles = [
    "Ketua",
    "Wakil Ketua",
    "Manpro R1",
    "Manpro R2",
    "Kepala Divisi Mekanik",
    "Kepala Divisi Kontrol",
    "Kru Mekanik",
    "Kru Kontrol",
    "Official",
  ];

  const generations = [13, 14, 15];

  return (
    <>
      <div className="form-wrapper">
        {isLoading && <LoadingSpinner color={"black"} loading={isLoading} />}
        <form
          className="card auth-form"
          onSubmit={handleSubmit((data) => authSubmitHandler(data))}
        >
          <div className="form-group">
            <label>Alamat Email</label>
            <input
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              {...register("email", { required: true })}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              {...register("password", { required: true })}
              required
            />
          </div>

          {!isLoginMode && (
            <>
              <div className="form-group">
                <label>Nama Lengkap</label>
                <input
                  type="name"
                  className="form-control"
                  placeholder="Nama Lengkap"
                  {...register("name", { required: true })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <Controller
                  name="position"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <select
                      className="form-control scrollable-select"
                      {...field}
                      required
                    >
                      <option value="">...</option>
                      {roles.map((role) => {
                        return (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        );
                      })}
                    </select>
                  )}
                ></Controller>
              </div>
              <div className="form-group">
                <label>Kru Angkatan</label>
                <Controller
                  name="generation"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <select
                      className="form-control overflow-auto"
                      {...field}
                      required
                    >
                      <option value="">...</option>
                      {generations.map((generation) => {
                        return (
                          <option key={generation} value={generation}>
                            {generation}
                          </option>
                        );
                      })}
                    </select>
                  )}
                ></Controller>
              </div>
              <div className="form-group date-picker">
                <label>Tanggal lahir</label>
                <Controller
                  name="dateOfBirth"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <DatePicker
                      className="form-control"
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
          <div className="submit-button-wrapper">
            <a href="#" className="login-switcher" onClick={switchModeHandler}>
              {isLoginMode
                ? "Belum punya akun? Daftar disini"
                : "Sudah punya akun? Login disini"}
            </a>
            <button type="submit" className="btn btn-primary submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Auth;
