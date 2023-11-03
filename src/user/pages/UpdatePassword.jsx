import { React, useState, useContext } from "react";
import axios from "axios";

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
    if(submittedData.newPassword !== submittedData.comfirmNewPassword){
        alert("Password baru dan comfirm password baru tidak sama");
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
      alert("Password updated successfully");
    } catch (err) {
      console.log(err);
      if (err.response) {
        console.log(err.response);
        setError(err.response.data.message);
        alert(err.response.data.message);
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
