import { React, useState, useContext } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { AuthContext } from "../../shared/context/AuthContext";
import { useForm } from "react-hook-form";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import "../../shared/components/FormElements/Form.css";
import "./UpdateProfile.css";

const UpdatePassword = () => {
  const auth = useContext(AuthContext);

  let { register, control, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const updatePasswordSubmitHandler = async (submittedData) => {
    setIsLoading(true);
    if (submittedData.newPassword !== submittedData.comfirmNewPassword) {
      confirmAlert({
        title: "Error",
        message: "Password baru dan konfirmasi password baru tidak sama",
        buttons: [
          {
            label: "Ok",
          },
        ],
      });
      setIsLoading(false);
      return;
    }
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/users/update-password`,
        submittedData,
        {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );
      console.log(response.data.user);
      setIsLoading(false);
      confirmAlert({
        title: "Success",
        message: "Password berhasil diubah",
        buttons: [
          {
            label: "Ok",
          },
        ],
      });
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
  };

  return (
    <>
      <div className="form-wrapper">
        {isLoading && <LoadingSpinner color={"black"} loading={isLoading} />}
        <form
          className="card auth-form"
          onSubmit={handleSubmit((submittedData) =>
            updatePasswordSubmitHandler(submittedData)
          )}
        >
          <div className="form-group">
            <label>Password lama</label>
            <input
              type="password"
              className="form-control"
              placeholder="Old Password"
              {...register("oldPassword", { required: true })}
              required
            />
          </div>

          <div className="form-group">
            <label>Password baru</label>
            <input
              type="password"
              className="form-control"
              placeholder="New Password"
              {...register("newPassword", { required: true })}
              required
            />
          </div>

          <div className="form-group">
            <label>Comfirm password baru</label>
            <input
              type="password"
              className="form-control"
              placeholder="Comfirm password baru"
              {...register("comfirmNewPassword", { required: true })}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdatePassword;
