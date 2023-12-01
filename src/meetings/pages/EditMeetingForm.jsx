import React, { useContext } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../shared/context/AuthContext";
import { useForm, Controller } from "react-hook-form";
import { confirmAlert } from "react-confirm-alert";
import DatePicker from "react-date-picker";
import "react-confirm-alert/src/react-confirm-alert.css";

import { FormContext } from "../../shared/context/FormContext";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import "../../shared/components/FormElements/Form.css";
import FormEditElement from "../../shared/components/FormElements/FormEditElement";
import { FormSelect } from "react-bootstrap";
import FormSelectElement from "../../shared/components/FormElements/FormSelectElement";

// convert minute, hour, and date to ISO string
const convertToISO = (date, hour, minute) => {
  const newDate = new Date(date);
  if (hour > 23 || hour < 0 || minute > 59 || minute < 0) {
    return null;
  }
  newDate.setHours(hour);
  newDate.setMinutes(minute);
  return newDate.toISOString();
};

const EditMeetingForm = () => {
  const { mid } = useParams();
  const auth = useContext(AuthContext);
    const formContext = useContext(formContext);

  const [meetingData, setMeetingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let { register, control, handleSubmit, reset } = useForm();

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/meetings/meeting/${mid}`,
          {
            headers: {
              Authorization: "Bearer " + auth.token,
            },
          }
        );
        setMeetingData(response.data.meeting);

        console.log(response.data);
      } catch (err) {
        console.log(err);
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
    };
    fetchMeeting();
  }, []);

  useEffect(() => {
    const setFormDefaultValue = (data) => {
      reset({
        title: data.title,
        date: data.date,
        hour: new Date(data.date).getHours(),
        minute: new Date(data.date).getMinutes(),
        division: data.division,
      });
    };
    if (meetingData != null) {
      setFormDefaultValue(meetingData);
    }
  }, [meetingData, reset]);

  const divisions = formContext.divisions;
  

  const onSubmitHandler = async (data) => {
    try {
      data.date = convertToISO(data.date, data.hour, data.minute);
      if (!data.date) {
        throw new Error("Invalid date");
      }
      const response = await axios.patch(
        `http://localhost:5000/api/meetings/meeting/${mid}`,
        data,
        {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );

      confirmAlert({
        title: "Success",
        message: "Meeting berhasil dijadwalkan",
        buttons: [
          {
            label: "Ok",
          },
        ],
      });
    } catch (err) {
      console.log(err);
      if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.message
      ) {
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
      confirmAlert({
        title: "Error",
        message: "Terjadi kesalahan",
        buttons: [
            {
                label: "Ok",
            },
        ],
      })
    }
  };

  return (
    <div className="form-wrapper">
      {meetingData && (
        <form
          className="card auth-form"
          onSubmit={handleSubmit((data) => onSubmitHandler(data))}
        >
          <FormEditElement
            label="Title"
            name="title"
            type="text"
            register={register}
          />
          <div className="form-group date-picker">
            <label>Date</label>
            <Controller
              name="date"
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
          <FormEditElement
            label="Hour"
            name="hour"
            type="number"
            register={register}
          />
          <FormEditElement
            label="Minute"
            name="minute"
            type="number"
            register={register}
          />

          <FormSelectElement
            label="Division"
            name="division"
            register={register}
            optionList={divisions}
            defaultValue={meetingData.division}
          />

          <div className="button-wrapper">
            <button type="submit" className="btn btn-primary submit-button">
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditMeetingForm;
