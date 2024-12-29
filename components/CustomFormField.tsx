"use client";

import React from "react";
import Image from "next/image";
import { Control } from "react-hook-form";

// UI imports
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

// Custom Types
export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

import { E164Number } from "libphonenumber-js/core";

// Renderer Function
const RenderField = ({
  field,
  props,
}: {
  field: any;
  props: CustomFormFieldPropsType;
}) => {
  const { fieldType, iconSrc, iconAlt, placeholder } = props;

  // render the input accounding to fieldType
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {/* input field icon */}
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              height={24}
              width={24}
              className="ml-2"
            />
          )}

          {/* control */}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="IN"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone"
          >
          </PhoneInput>
        </FormControl>
      );
    case FormFieldType.TEXTAREA:
      return <></>;
    default:
      break;
  }
};

// Current component ⚛️
const CustomFormField = (props: CustomFormFieldPropsType) => {
  // destructuring
  const { control, name, label, fieldType } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {/* label */}
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}

          {/* input */}
          <RenderField field={field} props={props} />

          {/* error messages */}
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
