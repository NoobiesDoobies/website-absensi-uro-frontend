import { React, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../../shared/context/AuthContext";
import { useForm, Controller } from "react-hook-form";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import "./Auth.css";

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
        console.log(response.data.user.id);
        setIsLoading(false);
        auth.setAsAdmin(response.data.user.role);
        auth.login();
        auth.setId(response.data.user.id);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
        setError(err.message);
        alert(err.message);
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/users/signup",
          data
        );
        console.log(response.data.user.id);
        setIsLoading(false);
        auth.setAsAdmin(response.data.user.role);
        auth.login();
        auth.setId(response.data.user.id);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
        setError(err.message);
        alert(err.message);
      }
    }
  };

  //   if (isLoginMode) {
  //     try {
  //       const response = await fetch("http://localhost:5000/api/users/login", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(data),
  //       });
  //       if (!response.ok) {
  //         console.log("error code 400-ish");
  //         throw new Error(responseData.message);
  //       }

  //       const responseData = await response.json();

  //       setIsLoading(false);
  //       auth.login();
  //       // auth.setAsAdmin()
  //     } catch (err) {
  //       setIsLoading(false);
  //       setError(err.message || "An unknown error occured");
  //       console.log(err);
  //     }
  //   } else {
  //     try {
  //       const response = await fetch("http://localhost:5000/api/users/signup", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(data),
  //       });

  //       // true if status code is 200-ish
  //       if (!response.ok) {
  //         console.log("error code 400-ish");
  //         throw new Error(responseData.message);
  //       }
  //       const responseData = await response.json();

  //       setIsLoading(false);
  //       auth.login();
  //     } catch (err) {
  //       setIsLoading(false);
  //       setError(err.message || "An unknown error occured");
  //       alert(err.message);
  //     }
  //   }
  // };

  const roles = [
    "Ketua",
    "Wakil Ketua",
    "Manpro R1",
    "Manpro R2",
    "Kadiv Mekanik",
    "Kadiv Kontrol",
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
            </>
          )}

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <a href="#" onClick={switchModeHandler}>
            {isLoginMode
              ? "Belum punya akun? Daftar disini"
              : "Sudah punya akun? Login disini"}
          </a>
        </form>
      </div>
    </>
  );
};

export default Auth;
