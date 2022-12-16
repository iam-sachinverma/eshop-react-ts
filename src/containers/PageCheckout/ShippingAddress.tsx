import Label from "components/Label/Label";
import React, { FC, useEffect } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Input from "shared/Input/Input";
import Radio from "shared/Radio/Radio";
import Select from "shared/Select/Select";

import { useForm, SubmitHandler } from "react-hook-form"
import { useUpdateCustomerMutation, useGetCustomerQuery } from "features/customer/customerApiSlice";


interface Props {
  isActive: boolean;
  customerID?: string;
  isMail?: string,
  onCloseActive: () => void;
  onOpenActive: () => void;
}

const ShippingAddress: FC<Props> = ({
  isActive,
  onCloseActive,
  onOpenActive,
  customerID,
  isMail
}) => {

  const [ updateCustomer, { isSucess } ] = useUpdateCustomerMutation();

  const { data:customer, refetch } = useGetCustomerQuery(isMail);

  const {register, handleSubmit} = useForm<any>();

  // Create WooCommerce Customer
  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      const update = {
        id: customerID,
        billing: {
          ...data
        },
        shipping: {
          ...data
        }
      }
      console.log(update);
      await updateCustomer(update).unwrap();
      await refetch();
    } catch (error) {
      console.log(error);
    }
  };  

  const renderShippingAddress = () => {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl ">
        <div className="p-6 flex flex-col sm:flex-row items-start">
          <span className="hidden sm:block">
            <svg
              className="w-6 h-6 text-slate-700 dark:text-slate-400 mt-0.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1401 15.0701V13.11C12.1401 10.59 14.1801 8.54004 16.7101 8.54004H18.6701"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.62012 8.55005H7.58014C10.1001 8.55005 12.1501 10.59 12.1501 13.12V13.7701V17.25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.14008 6.75L5.34009 8.55L7.14008 10.35"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.8601 6.75L18.6601 8.55L16.8601 10.35"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <div className="sm:ml-8">
            <h3 className=" text-slate-700 dark:text-slate-300 flex ">
              <span className="uppercase">SHIPPING ADDRESS</span>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-5 h-5 ml-3 text-slate-900 dark:text-slate-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </h3>
            <div className="font-semibold mt-1 text-sm">
              <span className="">
                { customer?.length > 0 ? customer?.[0]?.shipping?.address_1 + ` ${customer?.[0]?.shipping?.state}` : "" }
              </span>
            </div>
          </div>
          <ButtonSecondary
            sizeClass="py-2 px-4 "
            fontSize="text-sm font-medium"
            className="bg-slate-50 dark:bg-slate-800 mt-5 sm:mt-0 sm:ml-auto !rounded-lg"
            onClick={onOpenActive}
          >
            Change
          </ButtonSecondary>
        </div>
        <div
          className={`border-t border-slate-200 dark:border-slate-700 px-6 py-7 space-y-4 sm:space-y-6 ${
            isActive ? "block" : "hidden"
          }`}
        >

          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset>

              {/* ============ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3 my-2">
                <div>
                  <Label className="text-sm">First name</Label>
                  <Input 
                   {...register("first_name")}
                   id="first_name"
                   className="mt-1.5" 
                   defaultValue={customer?.[0]?.billing?.first_name}
                  />
                </div>
                <div>
                  <Label className="text-sm">Last name</Label>
                  <Input 
                    {...register("last_name")}
                    id="last_name"
                    className="mt-1.5" 
                   defaultValue={customer?.[0]?.billing?.last_name}
                  />
                </div>
              </div>

              {/* ============ */}
              <div className="sm:flex space-y-4 sm:space-y-0 sm:space-x-3 my-2">
                <div className="flex-1">
                  <Label className="text-sm">Address</Label>
                  <Input
                    {...register("address_1")}
                    id="address_1"
                    className="mt-1.5"
                    placeholder=""
                    defaultValue={customer?.[0]?.billing?.address_1}
                    type={"text"}
                  />
                </div>
              </div>

              {/* ============ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3 my-4">
                <div>
                  <Label className="text-sm">City</Label>
                  <Input 
                   {...register("city")}
                   id="city"
                   className="mt-1.5" 
                   defaultValue={customer?.[0]?.billing?.city}

                  />
                </div>
                
                <div>
                  <Label className="text-sm">State</Label>
                  <Input 
                   {...register("state")}
                   id="state"
                   className="mt-1.5" 
                   defaultValue={customer?.[0]?.billing?.state}
 
                  />
                </div>
              </div>

              {/* ============ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3 my-4">
                
                <div>
                  <Label className="text-sm">Pin code</Label>
                  <Input 
                   {...register("postcode")}
                   id="postcode"
                   className="mt-1.5" 
                   defaultValue={customer?.[0]?.billing?.postcode}

                  />
                </div>

                <div>
                  <Label className="text-sm">Country</Label>
                  <Input 
                   {...register("country")}
                   id="country"
                   className="mt-1.5" 
                   defaultValue={customer?.[0]?.billing?.country}
                  />
                </div>

              </div>

              {/* ============ */}
              {/* <div> 
                <Label className="text-sm">Address type</Label>
                <div className="mt-1.5 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  <Radio
                    label={`<span class="text-sm font-medium">Home <span class="font-light">(All Day Delivery)</span></span>`}
                    id="Address-type-home"
                    name="Address-type"
                    defaultChecked
                  />
                  <Radio
                    label={`<span class="text-sm font-medium">Office <span class="font-light">(Delivery <span class="font-medium">9 AM - 5 PM</span>)</span> </span>`}
                    id="Address-type-office"
                    name="Address-type"
                  />
                </div>
              </div> */}

              {/* ============ */}
              <div className="flex flex-col sm:flex-row pt-6 my-2">
                <ButtonPrimary
                  className="sm:!px-7 shadow-none"
                  onClick={onCloseActive}
                  type="submit"
                >
                  Save and next to Payment
                </ButtonPrimary>
                <ButtonSecondary
                  className="mt-3 sm:mt-0 sm:ml-3"
                  onClick={onCloseActive}
                >
                  Cancel
                </ButtonSecondary>
              </div>

            </fieldset>
          </form>

        </div>
      </div>
    );
  };

  return renderShippingAddress();
};

export default ShippingAddress;
