import { React, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../../shared/context/AuthContext";
import { useForm, Controller } from "react-hook-form";
import "./Auth.css";

const Auth = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const [isLoginMode, setIsLoginMode] = useState(true);

  const { register, control, handleSubmit } = useForm();

  const switchModeHandler = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (data) => {
    console.log(JSON.stringify({...data}));
    if (isLoginMode) {
      fetch("http://localhost:5000/api/users/signup", {
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...data}),
      });
    } else {
      try {
        const response = await fetch("http://localhost:5000/api/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const responseData = await response.json();
        console.log(responseData);
        
      } catch (err) {
        console.log(err);
      }
    }

    auth.login();
  };

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
    <div className="form-wrapper">
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
  );
};

export default Auth;
