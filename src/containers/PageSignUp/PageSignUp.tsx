import React, { FC, useState } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";

import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from 'react-hook-form'
import { useCreateCustomerMutation } from "features/customer/customerApiSlice"

export interface PageSignUpProps {
  className?: string;
}

type SignUp = {
  first_name: string;
  email: string;
  password: string;
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

const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {
  const navigate = useNavigate();

  const [ createCustomer, { isSuccess } ] = useCreateCustomerMutation();  

  const {register, handleSubmit, formState: { errors }} = useForm<SignUp>();
  
  const [errMsg, setErrMsg] = useState('');
  
  const onSubmit: SubmitHandler<SignUp> = async (data) => {
    try {
      await createCustomer(data).unwrap();
      navigate('/login')
    } catch (error:any) {
      
      if(error.status === 400){
        
        if(error.data.code === 'registration-error-email-exists'){
          setErrMsg('An account is already registered with your email address')
        }
        
      }else if(error.data.status === 401){
        setErrMsg(error.data.message)
      }
    }
  };

  return (
    <div className={`nc-PageSignUp  ${className}`} data-nc-id="PageSignUp">
      <Helmet>
        <title>Sign up || Eco Freaky</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-8 lg:my-10 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-medium text-neutral-900 dark:text-neutral-100 justify-center">
          Create Account
        </h2>
        <br></br>
        <div className="max-w-md mx-auto space-y-6">
          {/* <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className=" flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
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
                Name
              </span>
              <Input
                {...register("first_name", 
                  { 
                  required: true,
                  pattern: /^[a-zA-Z]+ [a-zA-Z]+$/
                  }
                )} 
                id="first_name" 
                type="text"
                className="mt-1"
              />
              {/* Form Validation */}
              {errors.first_name ? (
                <>
                  {errors.first_name.type === "required" && (
                    <p className="text-lime-400 my-2 mx-2">
                      {'Please enter a your name'}
                    </p>
                  )}
                  {errors.first_name.type === "pattern" && (
                    <p className="text-lime-400 my-2 mx-2">
                      {'Please enter a valid name'}
                    </p>
                  )}
                </>
                ) : null
              }
            </label>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                {...register("email", 
                 { 
                  required: true,
                  pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
                 }
                )} 
                id="email"
                name="email"
                type="email"
                className="mt-1"
              />
              {errors.email ? (
                <>
                  {errors.email.type === "required" && (
                    <p className="text-lime-400 my-2 mx-2">
                      {'Please enter a your email'}
                    </p>
                  )}
                  {errors.email.type === "pattern" && (
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
            Already have an account? {` `}
            <Link className="text-green-600" to="/login">
              Sign in
            </Link>
          </span>

        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
