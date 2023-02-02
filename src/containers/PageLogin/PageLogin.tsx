import React, { FC, useState } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import toast from "react-hot-toast";

import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAppDispatch } from "app/hooks";

// 
import { useRef } from "react";
import { setCredentials } from "features/auth/authSlice";
import { useLoginMutation } from "features/auth/authApiSlice";

export interface PageLoginProps {
  className?: string;
}

type LogIn = {
  username: string,
  password: string
}

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Twitter",
    href: "#",
    icon: twitterSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  const {register, handleSubmit, formState: { errors }} = useForm<LogIn>();

  const [errMsg, setErrMsg] = useState('');

  const [ login ] = useLoginMutation()

  const onSubmit: SubmitHandler<LogIn> = async (data) => {
    try {
      const userData = await login(data).unwrap()
      
      dispatch(setCredentials(userData));
      navigate('/', { replace: true })

      toast.success('Login Successfully Continue Shopping', {
        duration: 4000,
        position: 'bottom-center'
      })
      
    } catch (error:any) {

      if(error.status === 403){

       console.log(error);
         
       if(error.data.code === '[jwt_auth] incorrect_password'){
        setErrMsg('The password you entered is incorrect')
       }

       if(error.data.code === '[jwt_auth] invalid_email'){
        setErrMsg('Unknown email address. Check again or Create an account')
       }

      }else if(error.data.status === 401){
        setErrMsg(error.data.message)
      }
    }
  }; 
  
  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
        <title>Login || EcoFreaky</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-14 lg:my-16 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-medium text-neutral-900 dark:text-neutral-100 justify-center">
          Login
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          {/* <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <img
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
          </div> */}
          {/* OR */}
          {/* <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div> */}
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>

              <Input
                {...register("username", 
                 { 
                  required: true,
                  pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
                 }
                )} 
                id="username"
                name="username"
                type="email"
                className="mt-1"
              />

              {errors.username ? (
                <>
                  {errors.username.type === "required" && (
                    <p className="text-lime-400 my-2 mx-2">
                      {'Please enter a your email'}
                    </p>
                  )}
                  {errors.username.type === "pattern" && (
                    <p className="text-lime-400 my-2 mx-2">
                      {'Please enter a valid email'}
                    </p>
                  )}
                </>
                ) : null
              }

            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
                <Link to="/forgot-pass" className="text-sm text-green-600">
                  Forgot password?
                </Link>
              </span>

              <Input 
                {...register("password", { required: true })} 
                id="password"
                name="password" 
                type="password" 
                className="mt-1"
               />

               {errors.password ? (
                <>
                  {errors.password.type === "required" && (
                    <p className="text-lime-400 my-2 mx-2">
                      {'Please enter a password'}
                    </p>
                  )}
                </>
                ) : null
                }

            </label>

            <p className="text-lime-400">{errMsg === '' ? '' : errMsg}</p>

            <ButtonPrimary type="submit">Continue</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user? {` `}
            <Link className="text-green-600" to="/signup">
              Create an account
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
