"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Shadcn Form imports
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

// UI imports
import { Form, FormControl } from "@/components/ui/form";
import { RadioGroup } from "./ui/radio-group";

// component imports
import CustomFormField from "./CustomFormField";
import SubmitButton from "./SubmitButton";

// Form Schema
import { UserFormValidation } from "@/lib/validation";

// custom types
import { FormFieldType } from "./CustomFormField";

// constants imports
import { GenderOptions } from "@/constants";
import { RadioGroupItem } from "@radix-ui/react-radio-group";
import { Label } from "./ui/label";

// Current Component ⚛️
const RegisterForm = ({
  user,
}: {
  user: User;
}) => {
  // states and hooks
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit({}: z.infer<typeof UserFormValidation>) {
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Tell us more about yourself.</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 sapce-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
        </section>

        {/* custom form fields comp goes here */}
        {/* name */}
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="name"
          label="Full name"
          value={user?.name}
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        {/* row 1 */}
        <div className="flex flex-col gap-6 xl:flex-row">
          {/* email */}
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="email"
            label="Email address"
            value={user?.email}
            placeholder="john_doe@email.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />
          {/* phone number */}
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.PHONE_INPUT}
            name="phone"
            label="Phone Number"
            value={user?.phone}
            placeholder="(+91) 123-456-7890"
          />
        </div>

        {/* row 2 */}
        <div className="flex flex-col gap-6 xl:flex-row">
          {/* email */}
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.DATE_PICKER}
            name="birthDate"
            label="Date of Birth"
            placeholder="john_doe@email.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />
          {/* phone number */}
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SKELETON}
            name="gender"
            label="Gender"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderOptions.map((gender) => (
                    <div key={gender} className="radio-group">
                      <RadioGroupItem value={gender} id={gender}>
                        <Label htmlFor={gender} className="cursor-pointer">
                          {gender}
                        </Label>
                      </RadioGroupItem>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>

        {/* row 3 */}
        <div className="flex flex-col gap-6 xl:flex-row"></div>

        {/* row 4 */}
        <div className="flex flex-col gap-6 xl:flex-row"></div>

        {/* row 5 */}
        <div className="flex flex-col gap-6 xl:flex-row"></div>

        <SubmitButton isLoading={isLoading}>
          Get started
        </SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
