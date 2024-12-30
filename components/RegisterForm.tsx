"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Shadcn Form imports
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

// UI imports
import { Form, FormControl } from "@/components/ui/form";
import { RadioGroup } from "./ui/radio-group";
import { RadioGroupItem } from "@radix-ui/react-radio-group";
import { Label } from "./ui/label";
import { SelectItem } from "./ui/select";

// component imports
import CustomFormField from "./CustomFormField";
import SubmitButton from "./SubmitButton";
import FileUploader from "./FileUploader";

// Form Schema
import { UserFormValidation } from "@/lib/validation";

// custom types
import { FormFieldType } from "./CustomFormField";

// constants imports
import { Doctors, GenderOptions, IdentificationTypes } from "@/constants";

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

        {/* Personal Information section */}
        <section className="space-y-6">
          <div className="mb-9 sapce-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
        </section>

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

        {/* contact */}
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

        {/* DOB & gender */}
        <div className="flex flex-col gap-6 xl:flex-row">
          {/* DOB */}
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.DATE_PICKER}
            name="birthDate"
            label="Date of Birth"
            placeholder="john_doe@email.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />
          {/* gender */}
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="gender"
            label="Gender"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderOptions.map((gender, i) => (
                    <div key={gender + i} className="radio-group">
                      <RadioGroupItem value={gender} id={gender} />
                      <Label htmlFor={gender} className="cursor-pointer">
                        {gender}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>

        {/* Address and Work */}
        <div className="flex flex-col gap-6 xl:flex-row">
          {/* address */}
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="address"
            label="Address"
            placeholder="House No. 404, Wayne Towers"
          />
          {/* Occupation */}
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="occupation"
            label="Occupation"
            placeholder="software developer"
          />
        </div>

        {/* Emergency Contact */}
        <div className="flex flex-col gap-6 xl:flex-row">
          {/* emergency contact name */}
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="emergencyContactName"
            label="Emergency Contact Name"
            placeholder="Gaurdian's name"
          />
          {/* emergency contact number */}
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.PHONE_INPUT}
            name="emergencyContactNumber"
            label="Emergency Contact Number"
          />
        </div>

        {/* Medical Information Section */}
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>
        </section>

        {/* Primary Phyisician */}
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="primaryPhysician"
          label="Primary care physician"
          placeholder="Select a physician"
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

        {/* Insurance */}
        <div className="flex flex-col gap-6 xl:flex-row">
          {/* insurance */}
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="insuranceProvider"
            label="Insurance Provider"
            placeholder="LIC, Medicare, etc."
          />
          {/* Insurance no. */}
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="insurancePolicayNumber"
            label="Insurance Policy Number"
            placeholder="ABC45678TCD"
          />
        </div>

        {/* Allergies */}
        <div className="flex flex-col gap-6 xl:flex-row">
          {/* allergies */}
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="allergies"
            label="Allergies (if any)"
            placeholder="peanuts, penicillin, pollen, etc."
          />
          {/* current medication. */}
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="currentMedication"
            label="Current Medication"
            placeholder="Ibuprofen 200mg, Paracetamol 600mg"
          />
        </div>

        {/* Medical History */}
        <div className="flex flex-col gap-6 xl:flex-row">
          {/* Past medical history */}
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="pastMedicalHistory"
            label="Past Medical History"
            placeholder="apendicitis, heart attack, etc."
          />
          {/* family history */}
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="familyMedicalHistory"
            label="Family Medical History"
            placeholder="Mother: Diabetes, Father: Asthma, etc."
          />
        </div>

        {/* Identification Section */}
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verification</h2>
          </div>
        </section>

        {/* identification document select */}
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="identificationType"
          label="Identification Document"
          placeholder="Select a Document for identification"
        >
          {IdentificationTypes.map((document, i) => (
            <SelectItem
              key={document + i}
              value={document}
            >
              <span className="cursor-pointer">
                {document}
              </span>
            </SelectItem>
          ))}
        </CustomFormField>

        {/* Identification Number */}
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="identificationNumber"
          label="Identification Number"
          placeholder="AD1234567890BC"
        />

        {/* Identification Document upload */}
        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="identificationDocument"
          label="Scanned copy of Identification Document"
          renderSkeleton={(field) => (
            <FormControl>
              {/* TODO: File uploader */}
              <FileUploader
                files={field.value}
                onChange={field.onChange}
              />
            </FormControl>
          )}
        />

        {/* consent and privacy policy Section */}
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy Policy</h2>
          </div>
        </section>

        {/* Consent */}
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.CHECKBOX}
          name="treatmentConsent"
          label="I consent to treatments"
        />
        {/* disclosure */}
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.CHECKBOX}
          name="disclosureConsent"
          label="I const to disclosure of my information"
        />

        {/* Privacy */}
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.CHECKBOX}
          name="privacyConsent"
          label="I consent to the Privacy Policy"
        />

        <SubmitButton isLoading={isLoading}>
          Register
        </SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
