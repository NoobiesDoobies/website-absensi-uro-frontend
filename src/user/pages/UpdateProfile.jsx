import { React, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-date-picker";
import { useForm, Controller } from "react-hook-form";
import { confirmAlert } from "react-confirm-alert";

import { DayPicker } from 'react-day-picker';

import { FormContext } from "../../shared/context/FormContext";
import { AuthContext } from "../../shared/context/AuthContext";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import FormEditElement from "../../shared/components/FormElements/FormEditElement";
import FormSelectElement from "../../shared/components/FormElements/FormSelectElement";
import FormInputElement from "../../shared/components/FormElements/FormInputElement";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-day-picker/dist/style.css';
// convert date to dd/mm/yyyy

const UpdateProfile = () => {
  const auth = useContext(AuthContext);
  const formContext = useContext(FormContext);

  const [data, setData] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, isValid },
    control,
    reset
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [expandDateOfBirth, setExpandDateOfBirth] = useState(false);

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
      formData.append("division", submittedData.division);
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
      confirmAlert({
        title: "Success",
        message: "Profile berhasil diubah",
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

  useEffect(() => {
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
    fetchUserData();
  }, [auth.userId]);

  useEffect(() => {
    const setFormDefaultValue = (data) => {
      reset({
        email: data.email,
        name: data.name,
        position: data.position,
        division: data.division,
        generation: data.generation,
        dateOfBirth: new Date(data.dateOfBirth),
      });
    };
    if (data != null) {
      console.log("Setting default value");
      setFormDefaultValue(data);
    }
  }, [data, reset]);

  const roles = formContext.roles;

  const divisions = formContext.divisions.filter((division) => {
    return (
      division === "Mekanik" ||
      division === "Kontrol" ||
      division === "Official"
    );
  });

  const generations = formContext.generations;

  const FormInputs = [
    {
      label: 'name',
      type: 'text',
      name: 'name',
      placeholder: 'Name',
      error: 'Name is required',
    },
    {
      label: 'email',
      type: 'email',
      name: 'email',
      placeholder: 'Email',
      error: 'Email is required',
    },
    {
      label: 'password',
      type: 'password',
      name: 'password',
      placeholder: 'Password',
      error: 'Password is required',
    },
  ];

  const FormSelects = [
    {
      label: 'role',
      name: 'role',
      optionList: formContext.roles,
      placeHolder: 'Role',
      error: 'Role is required',
    },
    {
      label: 'division',
      name: 'division',
      optionList: formContext.divisions,
      placeHolder: 'Division',
      error: 'Division is required',
    },
    {
      label: 'generation',
      name: 'generation',
      optionList: formContext.generations,
      placeHolder: 'Generation',
      error: 'Generation is required',
    },
    {
      label: 'gender',
      name: 'gender',
      optionList: formContext.genderIdentities,
      placeHolder: 'Gender',
      error: 'Put down which kind of bitch u r babe',
    },
  ];

  const dateFooter = (
    <div className='flex flex-row-reverse w-full'>
      <button
        className='px-4 py-1.5 bg-gray-100 rounded-lg hover:bg-slate-300 transition-colors'
        onClick={() => setExpandDateOfBirth(false)}
      >
        Confirm
      </button>
    </div>
  );

  return (
    <div className='flex flex-col items-center justify-center min-h-[100vh]'>
      <h2 className='font-bold text-center mb-4 text-xl'>
        UPDATE PROFILE
      </h2>
      <form
        className='flex flex-col items-center w-screen gap-2 px-6 max-w-[20rem]'
        onSubmit={handleSubmit((data) => updateProfileSubmitHandler(data))}
      >
        {FormInputs.map((input) => {
          return (
            <FormInputElement
              key={input.name}
              label={input.label}
              type={input.type}
              name={input.name}
              placeholder={input.placeholder}
              className='flex-1 w-full'
              register={register}
              required={true}
              withLabel={false}
              error={input.error}
            />
          );
        })}

        {FormSelects.map((select, index) => {
          return (
            <FormSelectElement
              key={select.name}
              label={select.label}
              name={select.name}
              register={register}
              optionList={select.optionList}
              required={true}
              withLabel={false}
              className='flex-1 w-full'
              placeHolder={select.placeHolder}
            />
          );
        })}

        <div className='relative w-full'>
          <div
            onClick={() => setExpandDateOfBirth((prev) => !prev)}
            className='flex justify-between self-start w-full border-[2px] border-solid border-gray-800 py-1.5 px-3 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer'
          >
            <div className=''>{dateOfBirth ? dateOfBirth : 'Tanggal Lahir'}</div>
          </div>
          <div
            className={
              expandDateOfBirth
                ? 'absolute bottom-[110%] bg-blue-300/90 rounded-lg left-[50%] translate-x-[-50%]'
                : 'absolute bottom-[110%] bg-blue-300/90 rounded-lg left-[50%] translate-x-[-50%] hidden'
            }
          >
            <Controller
              name='dateOfBirth'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <DayPicker
                  mode='single'
                  onSelect={(date) => {
                    setDateOfBirth(date.toLocaleDateString('id-ID'))
                    field.onChange(date)
                  }}
                  selected={field.value}
                  footer={dateFooter}
                  {...field}
                />
              )}
            />
          </div>
        </div>

        <button
          disabled={isSubmitting || !isDirty || !isValid}
          type='submit'
          className={
            isSubmitting || !isDirty || !isValid
              ? 'rounded-xl px-8 py-1.5 w-full bg-blue-200 mt-2 cursor-not-allowed'
              : 'rounded-xl bg-blue-500 px-8 py-1.5 text-slate-100 mt-2 w-full hover:bg-blue-600 transition-colors'
          }
        >
          Update Profile
        </button>
      </form>



    </div>
  );
};

export default UpdateProfile;
