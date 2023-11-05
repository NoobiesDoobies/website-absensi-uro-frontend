import React, { useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import axios from "axios";

import { AuthContext } from "../../shared/context/AuthContext";
import FormSelectElement from "../../shared/components/FormElements/FormSelectElement";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import "../../shared/components/FormElements/Form.css";

const MeetingForm = () => {
  const auth = useContext(AuthContext);
  const { control, handleSubmit, register } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const [isJustOnce, setIsJustOnce] = useState(false);

  const [error, setError] = useState();

  const meetingSubmitHandler = async (data) => {
    data.createdBy = auth.userId;
    if(data.division === "Both"){
      data.division = ["Kontrol", "Mekanik"]
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/meetings/schedule",
        data,
        {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );
      console.log(response.data);
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
  };

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const hours = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

  const minutes = [0, 15, 30, 45];

  return (
    <div className="form-wrapper">
      {isLoading && <LoadingSpinner color={"black"} loading={isLoading} />}
      <form
        className="card auth-form"
        onSubmit={handleSubmit((data) => meetingSubmitHandler(data))}
      >
        <FormSelectElement
          name={"division"}
          label={"Division"}
          register={register}
          isRequired={true}
          optionList={["Both", "Mekanik", "Kontrol"]}
          multiple={true}
        />

        <FormSelectElement
          name={"day"}
          label={"Day"}
          register={register}
          isRequired={true}
          optionList={days}
        />

        <FormSelectElement
          name={"hour"}
          label={"Hour"}
          register={register}
          isRequired={true}
          optionList={hours}
        />

        <FormSelectElement
          name={"minute"}
          label={"Minute"}
          register={register}
          isRequired={true}
          optionList={minutes}
        />

        <div className="form-group">
          <label>Just Once?</label>
          <Controller
            name="isJustOnce"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <select
                className="form-control overflow-auto"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  setIsJustOnce(e.target.value === "true");
                }}
                required
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            )}
          />
        </div>

        {!isJustOnce && (
          <div className="form-group">
            <label>Date End</label>
            <Controller
              name="dateEnd"
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
        )}

        <button type="submit" className="btn btn-primary">
          Schedule meeting
        </button>
      </form>
    </div>
  );
};

export default MeetingForm;
