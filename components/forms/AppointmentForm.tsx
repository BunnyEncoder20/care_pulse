"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Shadcn Form
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

// UI
import { Form } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";

// component
import CustomFormField from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";

// Form Schema
import { UserFormValidation } from "@/lib/validation";

// custom types
import { FormFieldType } from "@/components/CustomFormField";

// server actions
import { createUser } from "@/lib/actions/patient.actions";

// constants
import { Doctors } from "@/constants";

// Current Component ⚛️
const AppointmentForm = ({
  userId,
  patientId,
  type,
}: {
  userId: string;
  patientId: string;
  type: "create" | "cancel" | "schedule";
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
  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try {
      const userData = { name, email, phone };

      const user = await createUser(userData);
      if (user) {
        router.push(`/patients/${user.$id}/register`);
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

  // Dynamic button label
  let submitButtonLabel;
  switch (type) {
    case "create":
      submitButtonLabel = "Make Appointment";
      break;
    case "cancel":
      submitButtonLabel = "Cancel Appointment";
      break;
    case "schedule":
      submitButtonLabel = "Schedule Appointment";
      break;
    default:
      break;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">New Appointment</h1>
          <p className="text-dark-700">Request an appointment in seconds.</p>
        </section>

        {/* Type create */}
        {type !== "cancel" && (
          <>
            {/* select doctor */}
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhyisician"
              label="Doctor"
              placeholder="Select a Doctor"
            >
              {Doctors.map((doctor, i) => (
                <SelectItem key={doctor.name + i} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt="doctor"
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            {/* appointment date */}
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Expected appointment date"
              showTimeSelect
              dateFormat="MM/dd/yyyy h:mm aa"
            />

            {/* reason & note */}
            <div className="flex gap-6 xl: flex-row">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Reason for appointment ?"
              />

              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="notes"
                label="Additional notes ?"
              />
            </div>
          </>
        )}

        {/* type cancel */}
        {type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for cancellation ?"
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          classnames={`${
            type === "cancel" ? "shad-dnager-btn" : "shad-primary-btn"
          } w-full`}
        >
          {submitButtonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
