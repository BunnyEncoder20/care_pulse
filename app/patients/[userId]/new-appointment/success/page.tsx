import React from "react";
import Image from "next/image";
import Link from "next/link";

// server actions
import { getAppointment } from "@/lib/actions/appointment.actions";

// constants
import { Doctors } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// curerent page 📄
const SuccessPage = async ({
  params: { userId },
  searchParams,
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);

  const doctor = Doctors.find((doc) =>
    doc.name === appointment?.primaryPhysician
  );

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        {/* logo */}
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo"
            height={1000}
            width={1000}
            className="h-10 w-fit"
          />
        </Link>

        {/* success section */}
        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            alt="success"
            height={300}
            width={280}
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span>
            {" "}
            has been submitted successfully
          </h2>
          <p>
            We will get in touch with you shortly to confirm your appointment
          </p>
        </section>

        {/* details of appointment */}
        <section className="request-details">
          <p>Requested appointment details:</p>
          <div className="flex items-center gap-3">
            <Image
              src={doctor?.image || "assets/icons/user.svg"}
              alt="doctor"
              height={100}
              width={100}
              className="size-12"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              alt="calender"
              height={24}
              width={24}
            />
            <p>{formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        {/* button */}
        <Button variant="outline" className="shad-primary-btn">
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>

        {/* copywright */}
        <p className="copyright ">
          &copy; 2024 Care Pulse
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;
