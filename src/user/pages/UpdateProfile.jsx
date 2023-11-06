import { React, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { useForm, Controller } from "react-hook-form";

import { AuthContext } from "../../shared/context/AuthContext";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import FormEditElement from "../../shared/components/FormElements/FormEditElement";
import FormSelectElement from "../../shared/components/FormElements/FormSelectElement";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import "../../shared/components/FormElements/Form.css";
import "./UpdateProfile.css";

const UpdateProfile = () => {
  const auth = useContext(AuthContext);

  const [data, setData] = useState(null);
  let { register, control, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isEditingMode, setIsEditingMode] = useState(false);

  const toggleEditingMode = (e) => {
    e.preventDefault();
    setIsEditingMode(!isEditingMode);
  };

  const updateProfileSubmitHandler = async (submittedData) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", submittedData.email);
      formData.append("name", submittedData.name);
      formData.append("position", submittedData.position);
      formData.append("generation", submittedData.generation);
      formData.append("image", submittedData.image[0]);
      formData.append("dateOfBirth", submittedData.dateOfBirth);
      const response = await axios.patch(
        `http://localhost:5000/api/users`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );
      console.log(response.data.user);
      setIsLoading(false);
      alert("Profile updated successfully");
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

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users/${auth.userId}`
      );
      setIsLoading(false);
      setData(response.data.user);
    } catch (err) {
      console.log(err.message);
      if (err.response) {
        alert(err.response.data.message);
      }
      setIsLoading(false);
    }
  };

  const setFormDefaultValue = (data) => {
    reset({
      email: data.email,
      name: data.name,
      position: data.position,
      generation: data.generation,
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (data != null) {
      console.log("Setting default value");
      setFormDefaultValue(data);
    }
  }, [data]);

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
      {data && (
        <div className="form-wrapper">
          {isLoading && <LoadingSpinner color={"black"} loading={isLoading} />}
          <form
            className="card auth-form"
            onSubmit={handleSubmit((submittedData) =>
              updateProfileSubmitHandler(submittedData)
            )}
          >
            <ImageUpload
              label="Foto Profil"
              register={register}
              name="image"
              isEditingMode={isEditingMode}
            />
            <FormEditElement
              label="Email"
              type="email"
              name="email"
              placeholder={data.email}
              register={register}
              isEditingMode={isEditingMode}
            />

            <FormEditElement
              label="Nama Lengkap"
              type="name"
              name="name"
              placeholder={data.name}
              register={register}
              isEditingMode={isEditingMode}
            />

            <FormSelectElement
              label="Position"
              name="position"
              register={register}
              optionList={roles}
              defaultValue={data.position}
              isEditingMode={isEditingMode}
            />

            <FormSelectElement
              label="Kru Angkatan"
              name="generation"
              register={register}
              optionList={generations}
              defaultValue={data.generation}
              isEditingMode={isEditingMode}
            />
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
            <div className="button-wrapper">
              <button className="btn btn-primary submit-button" onClick={toggleEditingMode}>
                Edit
              </button>
              <button type="submit" className="btn btn-primary submit-button">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdateProfile;
