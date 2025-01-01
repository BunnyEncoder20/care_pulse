import React from "react";
import Image from "next/image";

// component imports
import AppointmentForm from "@/components/forms/AppointmentForm";

// server actions
import { getPatient } from "@/lib/actions/patient.actions";

// current page 📄
const NewAppointment = async ({ params: { userId } }: SearchParamProps) => {
  // fetch patient
  const patient = await getPatient(userId);
  console.log("Fetched patient: ", patient.$id);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          {/* logo */}
          <Image
            src="/assets/icons/logo-full.svg"
            alt="CarePulse Logo"
            height={1000}
            width={1000}
            className="mb-12 h-10 w-fit"
          />

          {/* appointment form */}
          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient.$id}
          />

          {/* copywright */}
          <p className="coprright mt-10">
            &copy; 2024 Care Pulse
          </p>
        </div>
      </section>

      {/* right side image */}
      <Image
        src="/assets/images/appointment-img.png"
        alt="appointment image"
        height={1000}
        width={1000}
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};

export default NewAppointment;
