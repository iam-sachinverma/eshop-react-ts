import React, { FC } from "react";
import { useGetCustomerQuery } from "features/customer/customerApiSlice";
import { useAppSelector } from "app/hooks";

import Label from "components/Label/Label";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import CommonLayout from "./CommonLayout";
import { Helmet } from "react-helmet";

export interface AccountPageProps {
  className?: string;
}

const AccountPage: FC<AccountPageProps> = ({ className = "" }) => {

  const user:any = useAppSelector((state) => state.auth.user)

  const { data:customer, refetch, isSuccess  } = useGetCustomerQuery(user?.user_email);

  return (
    <div className={`nc-AccountPage ${className}`} data-nc-id="AccountPage">
      <Helmet>
        <title>Account || EcoFreaky</title>
      </Helmet>
      <CommonLayout>
        <div className="space-y-10 sm:space-y-12">
          {/* HEADING */}
          <h2 className="text-2xl sm:text-3xl font-semibold">
            Account infomation
          </h2>
          <div className="flex flex-col md:flex-row">
            <div className="flex-shrink-0 flex items-start">
              {/* AVATAR */}
              <div className="relative rounded-full overflow-hidden flex">
               
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />

              </div>
            </div>
            <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
              <div>
                <Label>Full name</Label>
                <Input className="mt-1.5" defaultValue={customer?.[0]?.first_name} />
              </div>

              {/* ---- */}

              {/* ---- */}
              <div>
                <Label>Email</Label>
                <div className="mt-1.5 flex">
                  <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                    <i className="text-2xl las la-envelope"></i>
                  </span>
                  <Input
                    className="!rounded-l-none"
                    defaultValue={customer?.[0]?.email}
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              {/* ---- */}
              <div>
                <Label>Phone number</Label>
                <div className="mt-1.5 flex">
                  <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                    <i className="text-2xl las la-phone-volume"></i>
                  </span>
                  <Input
                    className="!rounded-l-none"
                    defaultValue={customer?.[0]?.billing?.phone}
                  />
                </div>
              </div>
              {/* ---- */}
              {/* <div>
                <Label>About you</Label>
                <Textarea className="mt-1.5" defaultValue="..." />
              </div> */}
              <div className="pt-2">
                <ButtonPrimary>Update account</ButtonPrimary>
              </div>
            </div>
          </div>
        </div>
      </CommonLayout>
    </div>
  );
};

export default AccountPage;
