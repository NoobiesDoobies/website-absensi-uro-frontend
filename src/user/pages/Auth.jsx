import React from "react";

import { useForm, Controller } from "react-hook-form";
import "./Auth.css";

const Auth = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="form-wrapper">
      <form
        className="card auth-form"
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        <div className="form-group">
          <label>Email address</label>
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
            name="Role"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
            <select className="form-control"{...field} required>
                <option value="">Select...</option>
                <option value="Ketua">Ketua </option>
                <option value="Wakil Ketua">Wakil Ketua </option>
                <option value="Manpro R1">Manpro R1 </option>
                <option value="Manpro R2">Manpro R2 </option>
                <option value="Kadiv Mekanik">Kadiv Mekanik </option>
                <option value="Kadiv Kontrol">Kadiv Kontrol </option>
                <option value="Kru Mekanik">Kru Mekanik </option>
                <option value="Kru Kontrol">Kru Kontrol </option>
                <option value="Official">Official </option>
            </select>
          )}
          ></Controller>
        </div>
        <div className="form-group">
          <label>Kru Angkatan</label>
          <Controller
            name="Kru Angkatan"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
            <select className="form-control"{...field} required>
                <option value="">...</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
            </select>
          )}
          ></Controller>
        </div>


        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Auth;
