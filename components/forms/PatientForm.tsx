"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Shadcn Form imports
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

// UI imports
import { Form } from "@/components/ui/form";

// component imports
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";

// Form Schema
import { UserFormValidation } from "@/lib/validation";

// custom types
import { FormFieldType } from "../CustomFormField";

// server actions
import { createUser } from "@/lib/actions/patient.actions";

// Current Component ⚛️
const PatientForm = () => {
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
  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try {
      const userData = { name, email, phone };

      const user = await createUser(userData);
      if (!user.registered) {
        router.push(`/patients/${user.$id}/register`);
      } else if (user.registered) {
        router.push(`/patients/${user.$id}/new-appointment`);
      } else {
        throw new Error(
          "Something went wrong while creating user. Null user returned.",
        );
      }
    } catch (error) {
      console.error("There was a error in submitting form", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there 👋</h1>
          <p className="text-dark-700">Schedule your first appointement.</p>
        </section>

        {/* custom form fields comp goes here */}
        {/* name */}
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="name"
          label="Full name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        {/* email */}
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email address"
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
          placeholder="(+91) 123-456-7890"
        />
        <SubmitButton isLoading={isLoading}>
          Get started
        </SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
