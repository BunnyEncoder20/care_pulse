"use client";

import { Dispatch, SetStateAction, useState } from "react";
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
import { getAppointmentSchema } from "@/lib/validation";

// custom types
import { FormFieldType } from "@/components/CustomFormField";

// server actions
import {
  createAppointment,
  updateAppointment,
} from "@/lib/actions/appointment.actions";

// constants
import { Doctors } from "@/constants";
import { Appointment } from "@/types/appwrite.types";

// Current Component ⚛️
const AppointmentForm = ({
  userId,
  patientId,
  type = "create",
  appointment,
  setOpen,
}: {
  userId: string;
  patientId: string;
  type: "create" | "cancel" | "schedule";
  appointment?: Appointment;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  // states and hooks
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // getting the validation schema based on type
  const AppointmentFormValidation = getAppointmentSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment
        ? appointment.primaryPhysician
        : "John Green",
      schedule: appointment
        ? new Date(appointment.schedule)
        : new Date(Date.now()),
      reason: appointment ? appointment.reason : "",
      note: appointment ? appointment.note : "",
      cancellationReason: appointment?.cancellationReason || "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (
    values: z.infer<typeof AppointmentFormValidation>,
  ) => {
    console.log("Submitting form...");
    setIsLoading(true);
    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
        break;
    }

    try {
      if (type === "create" && patientId) {
        console.log("Creatign new appointment...");
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          note: values.note,
          status: status as Status,
        };
        const newAppointment = await createAppointment(appointmentData);
        if (newAppointment) {
          console.log("New appointment created successfully ✅");
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`,
          );
        }
      } else {
        if (appointment?.$id) {
          console.log("Updating appointment id: ", appointment?.$id);
          const appointmentToUpdate = {
            userId,
            appointmentId: appointment?.$id,
            appointment: {
              primaryPhysician: values.primaryPhysician,
              schedule: new Date(values.schedule),
              status: status as Status,
              cancellationReason: values.cancellationReason,
            },
            type,
          };

          const updatedAppointment = await updateAppointment(
            appointmentToUpdate,
          );

          if (updatedAppointment) {
            console.log("Updated appointment successfully ✅");
            if (setOpen) setOpen(false);
            form.reset();
          }
        }
      }
    } catch (error) {
      console.error("There was a error in submitting form ❌", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Dynamic button label
  let submitButtonLabel;
  switch (type) {
    case "cancel":
      submitButtonLabel = "Cancel Appointment";
      break;
    case "schedule":
      submitButtonLabel = "Schedule Appointment";
      break;
    default:
      submitButtonLabel = "Make Appointment";
      break;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        {type === "create" && (
          <section className="mb-12 space-y-4">
            <h1 className="header">New Appointment</h1>
            <p className="text-dark-700">
              Request a new appointment in seconds.
            </p>
          </section>
        )}

        {/* Type create */}
        {type !== "cancel" && (
          <>
            {/* select doctor */}
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
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
              dateFormat="MM/dd/yyyy - h:mm aa"
            />

            {/* reason & note */}
            <div
              className={`flex flex-col gap-6  ${
                type === "create" && "xl:flex-row"
              }`}
            >
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Reason for appointment ?"
                placeholder="Annual montly check-up"
                disabled={type === "schedule"}
              />

              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="Additional notes ?"
                placeholder="Prefer afternoon appointments, if possible"
                disabled={type === "schedule"}
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
            placeholder="Urgent meeting came up"
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          classnames={`${
            type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
          } w-full`}
        >
          {submitButtonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
