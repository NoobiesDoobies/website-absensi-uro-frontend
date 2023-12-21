import { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import DatePicker from 'react-date-picker';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-date-picker/dist/DatePicker.css';

// import loginBg from '../../shared/images/login-bg.svg';
import FormInputElement from '../../shared/components/FormElements/FormInputElement';
import { AuthContext } from '../../shared/context/AuthContext';
import { FormContext } from '../../shared/context/FormContext';
import { useForm } from 'react-hook-form';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import FormSelectElement from '../../shared/components/FormElements/FormSelectElement';

import logoKRAI from '../../assets/logo_garudago-cropped.png';

const Auth = () => {
  // const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const formContext = useContext(FormContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { register, handleSubmit, formState: {isSubmitting, isDirty, isValid} } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [page, setPage] = useState(1);

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
      error: 'Put down which kind of bitch u r babe'
    },
  ];

  const switchModeHandler = () => {
    setIsLoginMode((prevMode) => !prevMode);
    setPage(1);
  };

  const authSubmitHandler = async (data) => {
    console.log(data);
    setIsLoading(true);
    if (isLoginMode) {
      try {
        const response = await axios.post(
          'http://localhost:5000/api/users/login',
          data
        );
        setIsLoading(false);

        const { userId, email, isAdmin, token, name } = response.data;
        auth.login(userId, email, isAdmin, token, name);
      } catch (err) {
        console.log(err);
        if (err.response) {
          console.log(err.response);
          setError(err.response.data.message);
          confirmAlert({
            title: 'Error',
            message: err.response.data.message,
            buttons: [
              {
                label: 'Ok',
              },
            ],
          });
        }
        setIsLoading(false);
      }
    } else {
      try {
        const response = await axios.post(
          'http://localhost:5000/api/users/signup',
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
          confirmAlert({
            title: 'Error',
            message: err.response.data.message,
            buttons: [
              {
                label: 'Ok',
              },
            ],
          });
        }

        setIsLoading(false);
      }
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-[100vh]'>
      <h1 className='mb-10 font-mono text-4xl'>Absensi KRAI</h1>
      {isLoading && (
        <LoadingSpinner
          color={'black'}
          loading={isLoading}
        />
      )}
      <form
        className='flex flex-col items-center w-screen gap-2 px-6 max-w-[20rem]'
        onSubmit={handleSubmit((data) => authSubmitHandler(data))}
      >
        <div className='flex justify-center'>
          {/* <img
            src={loginBg}
            alt='login-bg'
            className='content-center'
          /> */}
          <img
            src={logoKRAI}
            className={'object-contain h-48'}
          ></img>
        </div>
        <h2 className='font-bold text-center'>
          {isLoginMode ? 'LOGIN TO YOUR ACCOUNT' : 'MAKE A NEW ACCOUNT'}
        </h2>
        {!isLoginMode && (
          <div className='self-start font-bold'>
            Step {page} of {Math.ceil(FormSelects.length / 3) + 1}
          </div>
        )}
        <>
          {FormInputs.map((input) => {
            if ((input.name === 'name' && isLoginMode) || page > 1) {
              return null;
            }
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
        </>

        {!isLoginMode && (
          <>
            {FormSelects.map((select, index) => {
              if (index >= (page - 2) * 3 && index < (page - 1) * 3) {
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
              }

              return null;
            })}

            {/* <div className=''>
              <label>Tanggal lahir</label>
              <Controller
                name='dateOfBirth'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <DatePicker
                    className='l'
                    {...field}
                    placeHolderText='Select Date'
                    onChange={(date) => field.onChange(date)}
                    selected={field.value}
                  />
                )}
              />
            </div> */}
          </>
        )}
        {error && (
          <div className='font-bold text-center text-red-500'>{error}</div>
        )}
        <div className='flex justify-between w-full gap-12'>
          {(isLoginMode && page === 1) ||
          page === Math.ceil(FormSelects.length / 3) + 1 ? (
            <>
              {isLoginMode || (
                <button
                  disabled={page === 1}
                  onClick={() => setPage((prevPage) => prevPage - 1)}
                  className={
                    page === 1
                      ? 'rounded-xl px-8 py-1.5 bg-slate-200 cursor-not-allowed mt-2'
                      : 'rounded-xl bg-blue-500 px-8 py-1.5 text-slate-100 mt-2 hover:bg-blue-600 transition-colors'
                  }
                >
                  Prev
                </button>
              )}
                <button
                disabled={isSubmitting || !isDirty || !isValid}
                type='submit'
                className={isSubmitting || !isDirty || !isValid ? 'rounded-xl px-8 py-1.5 w-full bg-blue-200 mt-2 cursor-not-allowed' : 'rounded-xl bg-blue-500 px-8 py-1.5 text-slate-100 mt-2 w-full hover:bg-blue-600 transition-colors'}
              >
                {!isLoginMode ? 'Sign Up' : 'Sign In'}
              </button>
            </>
          ) : (
            <>
              <button
                disabled={page === 1}
                onClick={() => setPage((prevPage) => prevPage - 1)}
                className={
                  page === 1
                    ? 'rounded-xl px-8 py-1.5 bg-slate-200 cursor-not-allowed mt-2'
                    : 'rounded-xl bg-blue-500 px-8 py-1.5 text-slate-100 mt-2 hover:bg-blue-600 transition-colors'
                }
              >
                Prev
              </button>
              <button
                onClick={() => setPage((prevPage) => prevPage + 1)}
                className='rounded-xl bg-blue-500 px-8 py-1.5 mt-2 text-slate-100 hover:bg-blue-600 transition-colors'
              >
                Next
              </button>
            </>
          )}
        </div>
        <div className='flex w-full gap-2 text-sm'>
          <p className='self-start'>
            {!isLoginMode ? 'Already have account?' : "Don't have account yet?"}
          </p>
          <div
            className='self-start font-bold text-blue-500 transition-colors cursor-pointer hover:underline'
            onClick={switchModeHandler}
          >
            {isLoginMode ? 'Sign Up?' : 'Log In?'}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Auth;
